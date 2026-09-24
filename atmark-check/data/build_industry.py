#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_industry.py — T2 CSV（業種データ本体・タクミ）→ data/industry.json への整形スクリプト（T3・ヒナタ）

入力：
  40_Web_Studio/atmark-shindan/02_調査/T2_業種データ本体_タクミ_v1_2026-09-24.csv
出力：
  00_CompanyOS/98. HP/site/atmark-check/data/industry.json

スキーマ契約：00_CompanyOS/98. HP/site/atmark-check/data/industry.schema.md（ケン凍結・T0確定版）
このスクリプトは何度実行しても同じ industry.json を出力する（決定的処理・乱数なし）。

【マッチョ確定事項（T3ブリーフより）】
- allIndustry（全産業平均）は不要 → unavailable のまま
- minWage[].prevAmount はv1では不要（令和7年度分は全都道府県で発効済み） → unavailable のまま
- stages[] は confidence: confirmed 固定（棚原さん本人が2026-09-24に確認済み・マッチョ指示によりestimatedから変更）
"""

import csv
import io
import json
from pathlib import Path

# ---- パス -------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parents[4]  # .../U-WAN本社
CSV_PATH = REPO_ROOT / "40_Web_Studio" / "atmark-shindan" / "02_調査" / "T2_業種データ本体_タクミ_v1_2026-09-24.csv"
OUT_PATH = SCRIPT_DIR / "industry.json"

GENERATED_AT = "2026-09-24"
SCHEMA_VERSION = "1.0.0"

# ---- capitalClass 正規化コード対応表（schema 3.1） ----------------------
CAPITAL_CLASS_MAP = {
    "1千万円以上-5千万円未満": "1000to5000",
    "1千万円未満": "under1000",
}


def read_csv_sections(path: Path):
    """CSVを '#' コメント行と空行で区切られた2セクション（A：業種／B：都道府県）に分割してパースする。"""
    text = path.read_text(encoding="utf-8-sig")  # 先頭BOM(﻿)対策
    lines = text.splitlines()

    sections = []
    current_block = []
    for line in lines:
        if line.strip() == "":
            if current_block:
                sections.append(current_block)
                current_block = []
            continue
        if line.lstrip().startswith("#"):
            # コメント行（セクション見出し）は捨てる。ただし新しいブロックの開始を示す
            if current_block:
                sections.append(current_block)
                current_block = []
            continue
        current_block.append(line)
    if current_block:
        sections.append(current_block)

    parsed_sections = []
    for block in sections:
        reader = csv.DictReader(io.StringIO("\n".join(block)))
        parsed_sections.append(list(reader))
    return parsed_sections


def value_wrapper(value, unit, source_id, confidence, computed=False, compute_formula=None, used_in_calc=False):
    return {
        "value": value,
        "unit": unit,
        "sourceId": source_id,
        "confidence": confidence,
        "computed": computed,
        "computeFormula": compute_formula,
        "usedInCalc": used_in_calc,
    }


def build_industries(rows_a):
    industries = []
    for row in rows_a:
        source_id = row["source_id"].strip()
        capital_class_label = row["capital_class"].strip()
        capital_class = CAPITAL_CLASS_MAP.get(capital_class_label)
        if capital_class is None:
            raise ValueError(f"未知の capital_class: {capital_class_label!r}（row={row}）")

        entry = {
            "industryCode": row["industry_code"].strip(),
            "industryName": row["industry_name"].strip(),
            "capitalClass": capital_class,
            "capitalClassLabel": capital_class_label,
            "fiscalYear": int(row["fiscal_year"]),
            "arari": {
                "sales": value_wrapper(int(row["sales"]), "万円", source_id, "confirmed", used_in_calc=False),
                "cogs": value_wrapper(int(row["cogs"]), "万円", source_id, "confirmed", used_in_calc=False),
                "employees": value_wrapper(int(row["employees"]), "人", source_id, "confirmed", used_in_calc=True),
                "officers": value_wrapper(int(row["officers"]), "人", source_id, "confirmed", used_in_calc=True),
                "officerSalary": value_wrapper(int(row["officer_salary"]), "万円", source_id, "confirmed", used_in_calc=False),
                "officerBonus": value_wrapper(int(row["officer_bonus"]), "万円", source_id, "confirmed", used_in_calc=False),
                "employeeSalary": value_wrapper(int(row["employee_salary"]), "万円", source_id, "confirmed", used_in_calc=False),
                "employeeBonus": value_wrapper(int(row["employee_bonus"]), "万円", source_id, "confirmed", used_in_calc=False),
                "welfare": value_wrapper(int(row["welfare"]), "万円", source_id, "confirmed", used_in_calc=False),
                "grossProfit": value_wrapper(
                    int(row["arari"]), "万円", source_id, "confirmed",
                    computed=True, compute_formula="sales - cogs", used_in_calc=True,
                ),
                "grossMarginRate": value_wrapper(
                    float(row["gross_margin"]), "%", source_id, "confirmed",
                    computed=True, compute_formula="grossProfit / sales * 100", used_in_calc=True,
                ),
                "atmark": value_wrapper(
                    float(row["atmark"]), "万円", source_id, "confirmed",
                    computed=True, compute_formula="grossProfit / (employees + officers)", used_in_calc=True,
                ),
                "laborPerEmployee": value_wrapper(
                    float(row["employee_cost_per_head"]), "万円", source_id, "confirmed",
                    computed=True,
                    compute_formula="(employeeSalary + employeeBonus + welfare) / employees",
                    used_in_calc=True,
                ),
                "officerCompPerHead": value_wrapper(
                    float(row["officer_comp_per_head"]), "万円", source_id, "confirmed",
                    computed=True,
                    compute_formula="(officerSalary + officerBonus) / officers",
                    used_in_calc=False,
                ),
                "laborShare": value_wrapper(
                    float(row["labor_share"]), "%", source_id, "confirmed",
                    computed=True,
                    compute_formula="(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
                    used_in_calc=False,
                ),
            },
            "fukakachi": {
                "usedInCalc": False,
                "addedValue": value_wrapper(None, "万円", None, "unavailable", used_in_calc=False),
                "operatingProfit": value_wrapper(None, "万円", None, "unavailable", used_in_calc=False),
                "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。",
            },
            "atmarkTopEst": value_wrapper(
                float(row["atmark_top_est"]), "万円", source_id, "estimated",
                computed=True, compute_formula="atmark * 1.5", used_in_calc=False,
            ),
            "sourceId": source_id,
        }
        entry["atmarkTopEst"]["note"] = "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
        industries.append(entry)
    return industries


def build_pref_arrays(rows_b):
    min_wage = []
    part_wage = []
    for row in rows_b:
        pref = row["pref"].strip()
        source_ids = [s.strip() for s in row["source_id"].split(";")]
        # 表定義：minWage → S2_...、partWage → S3_...
        s2 = next((s for s in source_ids if s.startswith("S2_")), None)
        s3 = next((s for s in source_ids if s.startswith("S3_")), None)
        if s2 is None or s3 is None:
            raise ValueError(f"pref={pref} の source_id にS2/S3が揃っていません: {row['source_id']!r}")

        min_wage.append({
            "pref": pref,
            "amount": value_wrapper(int(row["min_wage"]), "円", s2, "confirmed", used_in_calc=False),
            "effectiveDate": row["min_wage_effective"].strip(),
            "prevAmount": value_wrapper(None, "円", None, "unavailable", used_in_calc=False),
        })
        part_wage.append({
            "pref": pref,
            "amount": value_wrapper(int(row["part_hourly"]), "円", s3, "confirmed", used_in_calc=False),
            "year": int(row["part_hourly_year"]),
            "label": "パート・アルバイトの平均時給（短時間労働者）",
        })
    return min_wage, part_wage


def build_sources():
    return [
        {
            "id": "S1_houjin_kigyou_toukei_2025",
            "name": "法人企業統計調査 年次別調査 時系列データ 表1",
            "publisher": "財務省",
            "surveyYear": 2025,
            "url": "https://www.e-stat.go.jp/dbview?sid=0003060791",
            "retrievedDate": "2026-09-24",
        },
        {
            "id": "S2_chiiki_saitei_chingin_r7",
            "name": "地域別最低賃金の全国一覧",
            "publisher": "厚生労働省",
            "surveyYear": "令和7年度",
            "url": "https://www.mhlw.go.jp/content/11200000/001571192.pdf",
            "retrievedDate": "2026-09-24",
        },
        {
            "id": "S3_chingin_kouzou_kihon_tanjikan_r7",
            "name": "賃金構造基本統計調査 短時間労働者 産業計・男女計",
            "publisher": "厚生労働省",
            "surveyYear": "令和7年",
            "url": "https://www.e-stat.go.jp/stat-search/files?page=1&toukei=00450091&tstat=000001011429&tclass1=000001229845",
            "retrievedDate": "2026-09-24",
        },
        {
            # 棚原確定（2026-09-24・マッチョ指示）：ステージ論（1,000/2,000/3,000万円・月35万円の生活費からの逆算）は
            # 棚原さん本人が確認済み。sources[]へ正式登録し、stages[]のconfidenceをconfirmedに変更する。
            # name はpublisher・surveyYearを含めない（sourcesListHtml/出典シートが自動で
            # 「name（publisher・surveyYear）」の形に組み立てるため、含めると二重表示になる。
            # 結果として画面には「棚原メソッド ＠ステージ論（U-WAN・2026）」と表示される。
            "id": "S4_tanahara_stage_ron",
            "name": "棚原メソッド ＠ステージ論",
            "publisher": "U-WAN",
            "surveyYear": 2026,
            "url": None,
            "retrievedDate": "2026-09-24",
        },
    ]


def build_stages():
    # 棚原確定（2026-09-24・マッチョ指示）：ステージ論の数値は棚原さん本人が確認済みのため confirmed 固定。
    basis = "月35万円の生活費からの逆算"
    return [
        {"stageNumber": 1, "label": "ステージ1", "atmark": value_wrapper(1000, "万円", "S4_tanahara_stage_ron", "confirmed"), "basis": basis},
        {"stageNumber": 2, "label": "ステージ2", "atmark": value_wrapper(2000, "万円", "S4_tanahara_stage_ron", "confirmed"), "basis": basis},
        {"stageNumber": 3, "label": "ステージ3", "atmark": value_wrapper(3000, "万円", "S4_tanahara_stage_ron", "confirmed"), "basis": basis},
    ]


def build_all_industry():
    # マッチョ確定：allIndustry は不要。T2に全産業合計行が無いため unavailable のまま。
    return {
        "_note": "マッチョ確定（T3ブリーフ）：allIndustryは不要のためunavailableのまま据え置き。T2に全産業合計行が無いことに加えての確定事項。",
        "fiscalYear": 2025,
        "arari": {
            "grossMarginRate": value_wrapper(None, "%", None, "unavailable", used_in_calc=True),
            "atmark": value_wrapper(None, "万円", None, "unavailable", used_in_calc=True),
        },
        "sourceId": None,
    }


def main():
    sections = read_csv_sections(CSV_PATH)
    if len(sections) != 2:
        raise ValueError(f"CSVセクション数が想定外です（想定2、実際{len(sections)}）")
    rows_a, rows_b = sections

    if len(rows_a) != 24:
        raise ValueError(f"セクションA（業種データ）の行数が24ではありません: {len(rows_a)}")
    if len(rows_b) != 47:
        raise ValueError(f"セクションB（都道府県データ）の行数が47ではありません: {len(rows_b)}")

    industries = build_industries(rows_a)
    min_wage, part_wage = build_pref_arrays(rows_b)

    output = {
        "schemaVersion": SCHEMA_VERSION,
        "generatedAt": GENERATED_AT,
        "sources": build_sources(),
        "allIndustry": build_all_industry(),
        "industries": industries,
        "stages": build_stages(),
        "minWage": min_wage,
        "partWage": part_wage,
    }

    OUT_PATH.write_text(
        json.dumps(output, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"OK: {OUT_PATH} を書き出しました（industries={len(industries)}行 / minWage={len(min_wage)}件 / partWage={len(part_wage)}件）")


if __name__ == "__main__":
    main()
