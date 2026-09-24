# `industry.json` スキーマ契約（T0確定版）

- 確定：ケン 2026-09-24
- 参照元：`03_設計/設計書_v2_20260924.md`「業界データ」章「スキーマの要点」
- 実データ出典：`02_調査/T2_業種データ本体_タクミ_v1_2026-09-24.csv`
- **この契約はタクミ（データ調査）・ヒナタ（整形＝T3）・ルイ（UI＝T8/T9）・ケン（calc.js＝T5）が同時に参照する。確定後は変えない前提。フィールドの追加が必要になった場合はマッチョ経由で全員に周知してから行う。**

---

## 0. 単位・命名の大原則

- 金額はすべて **万円**（T2のCSVは法人企業統計の原表を万円換算済み。百万円→万円は×100で変換済み＝そのままこのスキーマに入る）
- 人数は **人**（小数可。パートは0.5人換算など、入力側の話でありデータ側は整数）
- 率は **%**（0〜100のnumber。0.4等の比率ではない）
- フィールド名はキャメルケース。CSVの列名（スネークケース）とは以下の対応表で変換する
- `arari.sales`／`arari.cogs`／`arari.officerSalary` 等の絶対額は**業種×資本金階級の母集団合計値**（法人企業統計の原表そのもの。1社あたりの数字ではない）。そのため `usedInCalc:false`。calc.jsが実際に使うのは `atmark`／`grossMarginRate`／`laborPerEmployee` 等の**比率・1人あたり**に正規化済みの値のみ（`usedInCalc:true`）
- 全ての実測・推計値は生の `{ value, unit, sourceId, confidence }` の形（＝「値ラッパー」。下記1.1）で包む。素のnumberを直接トップレベルに置かない（出典と確度を必ず携行させるため）

### 1.1 値ラッパー（Value Wrapper）共通形

```jsonc
{
  "value": 783.5,                 // number。取得できない場合は null
  "unit": "万円",                 // "万円" | "人" | "%" | "円" | null
  "sourceId": "S1_houjin_kigyou_toukei_2025",
  "confidence": "confirmed",      // "confirmed" | "estimated" | "unavailable"
  "computed": false,              // true なら他フィールドからの計算値
  "computeFormula": null,         // computed:true のときのみ文字列で式を書く（例 "sales - cogs"）
  "usedInCalc": true              // calc.js の計算式が直接参照するか。参考表示のみなら false
}
```

- `confidence: "unavailable"` の値は **画面に出さない**（設計書「出典表示ルール」）。`value` は `null` にする。`0` で埋めない（ヒナタT3への申し送りと同一ルールをスキーマ側でも強制する）
- `computed: true` の項目は `computeFormula` 必須（レビュー・ユウキの検算T4・T6の突合対象になる）

---

## 2. トップレベル構造

```jsonc
{
  "schemaVersion": "1.0.0",
  "generatedAt": "2026-09-24",       // ISO date。ヒナタがT3で再生成するたび更新
  "sources": [ /* SourceEntry[] 4.参照 */ ],
  "allIndustry": { /* IndustryArariBlock | null。5.参照 */ },
  "industries": [ /* IndustryEntry[] 3.参照 */ ],
  "stages": [ /* StageEntry[] 6.参照 */ ],
  "minWage": [ /* MinWageEntry[] 7.参照 */ ],
  "partWage": [ /* PartWageEntry[] 8.参照 */ ]
}
```

`minWage` と `partWage` は同じ都道府県キー（`pref`）で対応付くが、**独立した配列**にする（設計書「stagesとminWageを独立配列」の指示＋ブリーフ「minWage[].effectiveDate,prevAmount／partWage[]を追加」の指示に準拠）。UI側は `pref` でJOINして使う。

---

## 3. `industries[]`（＝T2 CSVセクションA、業種×資本金階級）

24行（12業種 × 2資本金階級）。CSVの1行がこのスキーマの1エントリに対応する。

```jsonc
{
  "industryCode": "construction",             // CSV industry_code
  "industryName": "建設業",                    // CSV industry_name
  "capitalClass": "1000to5000",                // 正規化コード。下記3.1対応表
  "capitalClassLabel": "1千万円以上-5千万円未満", // CSV capital_class（画面表示用）
  "fiscalYear": 2025,                          // CSV fiscal_year

  "arari": {
    // ★計算に使う値。付加価値ではなく「売上-売上原価」系列のみ
    "sales":          { value, unit:"万円", sourceId, confidence:"confirmed", computed:false, usedInCalc:false },
    "cogs":           { value, unit:"万円", sourceId, confidence:"confirmed", computed:false, usedInCalc:false },
    "employees":      { value, unit:"人",   sourceId, confidence:"confirmed", computed:false, usedInCalc:true  },
    "officers":       { value, unit:"人",   sourceId, confidence:"confirmed", computed:false, usedInCalc:true  },
    "officerSalary":  { value, unit:"万円", sourceId, confidence:"confirmed", computed:false, usedInCalc:false },
    "officerBonus":   { value, unit:"万円", sourceId, confidence:"confirmed", computed:false, usedInCalc:false },
    "employeeSalary": { value, unit:"万円", sourceId, confidence:"confirmed", computed:false, usedInCalc:false },
    "employeeBonus":  { value, unit:"万円", sourceId, confidence:"confirmed", computed:false, usedInCalc:false },
    "welfare":         { value, unit:"万円", sourceId, confidence:"confirmed", computed:false, usedInCalc:false },

    "grossProfit":    { value, unit:"万円", sourceId, confidence:"confirmed", computed:true,  computeFormula:"sales - cogs", usedInCalc:true },
    "grossMarginRate":{ value, unit:"%",   sourceId, confidence:"confirmed", computed:true,  computeFormula:"grossProfit / sales * 100", usedInCalc:true },
    "atmark":         { value, unit:"万円", sourceId, confidence:"confirmed", computed:true,  computeFormula:"grossProfit / (employees + officers)", usedInCalc:true },

    "laborPerEmployee":  { value, unit:"万円", sourceId, confidence:"confirmed", computed:true, computeFormula:"(employeeSalary + employeeBonus + welfare) / employees", usedInCalc:true },
    "officerCompPerHead":{ value, unit:"万円", sourceId, confidence:"confirmed", computed:true, computeFormula:"(officerSalary + officerBonus) / officers", usedInCalc:false },
    "laborShare":        { value, unit:"%",   sourceId, confidence:"confirmed", computed:true, computeFormula:"(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100", usedInCalc:false }
  },

  "fukakachi": {
    // ★参考表示専用。calc.js は絶対に参照しない（★最重要の地雷：付加価値と粗利は別物）
    "usedInCalc": false,
    "addedValue":     { value: null, unit:"万円", sourceId:null, confidence:"unavailable", computed:false },
    "operatingProfit":{ value: null, unit:"万円", sourceId:null, confidence:"unavailable", computed:false },
    "note": "法人企業統計 表1に存在するが、T2時点では収集対象外（usedInCalc:falseのため）。将来値を入れる場合もcalc.jsからは参照しない。"
  },

  "atmarkTopEst": { value, unit:"万円", sourceId, confidence:"estimated", computed:true, computeFormula:"atmark * 1.5", usedInCalc:false, note:"v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。" },

  "sourceId": "S1_houjin_kigyou_toukei_2025"
}
```

### 3.1 `capitalClass` 正規化コード対応表

| CSV `capital_class` | `capitalClass` コード |
|---|---|
| `1千万円以上-5千万円未満` | `1000to5000` |
| `1千万円未満` | `under1000` |

**v1の画面が使うのは `1000to5000` の1階級固定**（マッチョ確定事項）。`under1000` はデータとして持つが、UI（ルイ）はv1では参照しない。

### 3.2 業種コード一覧（12業種・CSV `industry_code` そのまま）

`construction`／`manufacturing`／`it_communication`／`transport_postal`／`wholesale`／`retail`／`real_estate`／`lodging_food`／`lifestyle_entertainment`／`professional_services`／`medical_welfare`／`other_services`

---

## 4. `sources[]`

```jsonc
{
  "id": "S1_houjin_kigyou_toukei_2025",
  "name": "法人企業統計調査 年次別調査 時系列データ 表1",
  "publisher": "財務省",
  "surveyYear": 2025,             // [v2] 個別の基準時点。揃えて見せない前提
  "url": "https://www.e-stat.go.jp/dbview?sid=0003060791",
  "retrievedDate": "2026-09-24"
}
```

3件を確定済み：`S1_houjin_kigyou_toukei_2025`（法人企業統計）／`S2_chiiki_saitei_chingin_r7`（地域別最低賃金・厚労省・令和7年度）／`S3_chingin_kouzou_kihon_tanjikan_r7`（賃金構造基本統計調査・短時間労働者・令和7年）。

---

## 5. `allIndustry`（全産業平均）

`industries[]` の1エントリと**同じ `arari` ブロック形**（`fukakachi`・`atmarkTopEst`・`capitalClass` 等は持たない、`arari` のみのオブジェクト）。**用途はI2（粗利率）の初期値のみ**（設計書「allIndustry（全産業平均）はI2粗利率の初期値のみに使う」）。

```jsonc
{
  "fiscalYear": 2025,
  "arari": { "grossMarginRate": { value, ... }, "atmark": { value, ... }, ... },
  "sourceId": "S1_houjin_kigyou_toukei_2025"
}
```

**★T0時点の未決事項**：T2のCSV（セクションA）には全産業合計行が含まれていない（12業種×2資本金階級の24行のみ）。したがって現時点では `allIndustry` は `confidence:"unavailable"`（`value:null`）で置く。全産業行の追加取得が必要かはタクミ・ヒナタとマッチョに要判断（下記「T0確定にあたっての申し送り」参照）。

---

## 6. `stages[]`（棚原ステージ論）

```jsonc
{
  "stageNumber": 1,
  "label": "ステージ1",
  "atmark": { value: 1000, unit:"万円", sourceId:"S4_tanahara_stage_ron", confidence:"estimated", computed:false },
  "basis": "月35万円の生活費からの逆算"
}
```

3件（1000／2000／3000万円）。**棚原さん本人の確認が取れるまで `confidence: "estimated"` 固定**（設計書指示どおり）。`sourceId` は暫定で `S4_tanahara_stage_ron` を発番したが、`sources[]` には未登録（棚原確認後にヒナタ・ケンが `sources[]` へ追記）。

---

## 7. `minWage[]`（都道府県別最低賃金）

CSVセクションBの `pref, min_wage, min_wage_effective` 列に対応。

```jsonc
{
  "pref": "沖縄",
  "amount": { value: 1023, unit:"円", sourceId:"S2_chiiki_saitei_chingin_r7", confidence:"confirmed", computed:false },
  "effectiveDate": "令和7年12月1日",
  "prevAmount": { value: null, unit:"円", sourceId:null, confidence:"unavailable", computed:false }
}
```

- `effectiveDate` は文字列そのまま保持（和暦表記。表示時に発効日を併記する設計のため、日付型に変換しない）
- **★T0時点の未決事項**：`prevAmount`（発効前の旧額）はT2のCSVに列が無く未取得。「未発効なら `prevAmount` を表示」という設計書の要件（画面と状態の定義4番）を満たすには追加データが要る。スキーマにはフィールドを用意したが、現状 `confidence:"unavailable"` で全件埋まる。実データ取得が必要ならタクミへの追加依頼をマッチョ経由で検討

47都道府県分。

## 8. `partWage[]`（パート・アルバイト平均時給）

CSVセクションBの `pref, part_hourly, part_hourly_year` 列に対応。

```jsonc
{
  "pref": "沖縄",
  "amount": { value: 1263, unit:"円", sourceId:"S3_chingin_kouzou_kihon_tanjikan_r7", confidence:"confirmed", computed:false },
  "year": 2025,
  "label": "パート・アルバイトの平均時給（短時間労働者）"
}
```

47都道府県分。**産業計のみ**（業種別クロスは設計書で不要と確定済み）。

---

## 9. CSV列 → スキーマ フィールド対応表（早見用）

### セクションA（`industries[]`）

| CSV列 | スキーマパス |
|---|---|
| `industry_code` | `industryCode` |
| `industry_name` | `industryName` |
| `capital_class` | `capitalClass`（正規化コード）＋`capitalClassLabel`（原文） |
| `fiscal_year` | `fiscalYear` |
| `sales` | `arari.sales.value` |
| `cogs` | `arari.cogs.value` |
| `employees` | `arari.employees.value` |
| `officers` | `arari.officers.value` |
| `officer_salary` | `arari.officerSalary.value` |
| `officer_bonus` | `arari.officerBonus.value` |
| `employee_salary` | `arari.employeeSalary.value` |
| `employee_bonus` | `arari.employeeBonus.value` |
| `welfare` | `arari.welfare.value` |
| `arari`（CSV列名） | `arari.grossProfit.value` |
| `gross_margin` | `arari.grossMarginRate.value` |
| `atmark` | `arari.atmark.value` |
| `officer_comp_per_head` | `arari.officerCompPerHead.value` |
| `employee_cost_per_head` | `arari.laborPerEmployee.value` |
| `labor_share` | `arari.laborShare.value` |
| `atmark_top_est` | `atmarkTopEst.value` |
| `source_id` | `sourceId`（各値ラッパーにも同じIDを伝播） |

### セクションB（`minWage[]` / `partWage[]`）

| CSV列 | スキーマパス |
|---|---|
| `pref` | `minWage[].pref` / `partWage[].pref` |
| `min_wage` | `minWage[].amount.value` |
| `min_wage_effective` | `minWage[].effectiveDate` |
| `part_hourly` | `partWage[].amount.value` |
| `part_hourly_year` | `partWage[].year` |
| `source_id` | 該当する `sourceId`（`;` 区切りで2件入っているため分割してそれぞれの配列に割り当てる。`minWage`→`S2_...`、`partWage`→`S3_...`） |

---

## 10. T0確定にあたっての申し送り（ヒナタ・タクミ・マッチョ向け）

1. **`allIndustry`（全産業平均）はT2に元データが無い。** 現状スキーマは `confidence:"unavailable"` で通す設計。I2粗利率の初期値をどう出すかはルイ（UI）判断が必要になるため、マッチョに要確認としてT0中間報告で明記した。
2. **`minWage[].prevAmount`（発効前の旧額）もT2に元データが無い。** 同様に `unavailable` で通す。「未発効ならprevAmountを表示」の要件を満たすタイミングは次回データ収集ラウンド判断。
3. **`stages[]` の `sourceId`（`S4_tanahara_stage_ron`）は 2026-09-24 に棚原さん本人がステージ論数値（1,000/2,000/3,000万円・月35万円逆算）を確認済み → `sources[]` に正式登録・`confidence: confirmed`。**
4. 上記3点はいずれも「値が無い＝`unavailable`」で表現しており、**`null`や`0`で埋めるアンチパターンは踏んでいない**（ヒナタへの申し送りと同じ基準をスキーマ自身が強制する）。
