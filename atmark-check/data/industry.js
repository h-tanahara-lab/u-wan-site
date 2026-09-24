/**
 * 自動生成ファイル。手で編集しない。
 * 生成元: scripts/build-industry-js.js
 * 入力: data/industry.json
 * 生成日時: 2026-09-24T04:27:35.573Z
 *
 * file:// で <script src="data/industry.js"></script> として読み込むためのJSON埋め込み版。
 * 正は data/industry.json（またはT3完了前は data/industry.sample.json）。
 * 内容を変えたいときはこのファイルを直接編集せず、元データを直してこのスクリプトを再実行する。
 */
var INDUSTRY_DATA = {
  "schemaVersion": "1.0.0",
  "generatedAt": "2026-09-24",
  "sources": [
    {
      "id": "S1_houjin_kigyou_toukei_2025",
      "name": "法人企業統計調査 年次別調査 時系列データ 表1",
      "publisher": "財務省",
      "surveyYear": 2025,
      "url": "https://www.e-stat.go.jp/dbview?sid=0003060791",
      "retrievedDate": "2026-09-24"
    },
    {
      "id": "S2_chiiki_saitei_chingin_r7",
      "name": "地域別最低賃金の全国一覧",
      "publisher": "厚生労働省",
      "surveyYear": "令和7年度",
      "url": "https://www.mhlw.go.jp/content/11200000/001571192.pdf",
      "retrievedDate": "2026-09-24"
    },
    {
      "id": "S3_chingin_kouzou_kihon_tanjikan_r7",
      "name": "賃金構造基本統計調査 短時間労働者 産業計・男女計",
      "publisher": "厚生労働省",
      "surveyYear": "令和7年",
      "url": "https://www.e-stat.go.jp/stat-search/files?page=1&toukei=00450091&tstat=000001011429&tclass1=000001229845",
      "retrievedDate": "2026-09-24"
    }
  ],
  "allIndustry": {
    "_note": "マッチョ確定（T3ブリーフ）：allIndustryは不要のためunavailableのまま据え置き。T2に全産業合計行が無いことに加えての確定事項。",
    "fiscalYear": 2025,
    "arari": {
      "grossMarginRate": {
        "value": null,
        "unit": "%",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": true
      },
      "atmark": {
        "value": null,
        "unit": "万円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": true
      }
    },
    "sourceId": null
  },
  "industries": [
    {
      "industryCode": "construction",
      "industryName": "建設業",
      "capitalClass": "1000to5000",
      "capitalClassLabel": "1千万円以上-5千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 5164803900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 3772451900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 1443345,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 333759,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 224999300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 17635600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 486649700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 93449200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 70060100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 1392352000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 27,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 783.5,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 450.5,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 727,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 64.1,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 1175.2,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "construction",
      "industryName": "建設業",
      "capitalClass": "under1000",
      "capitalClassLabel": "1千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 3208108500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 1989037500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 1317249,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 659918,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 280012500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 10956000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 413020300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 37258000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 58050500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 1219071000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 38,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 616.6,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 385.9,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 440.9,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 65.6,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 924.9,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "manufacturing",
      "industryName": "製造業",
      "capitalClass": "1000to5000",
      "capitalClassLabel": "1千万円以上-5千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 6464568000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 4973752800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 2689290,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 296999,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 194550700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 9636600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 818785300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 132431400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 116966700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 1490815200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 23.1,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 499.2,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 397.2,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 687.5,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 85.3,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 748.8,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "manufacturing",
      "industryName": "製造業",
      "capitalClass": "under1000",
      "capitalClassLabel": "1千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 1453388200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 914862700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 966369,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 287721,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 127537500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 2277100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 224210700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 19550600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 26089600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 538525500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 37.1,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 429.4,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 279.2,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 451.2,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 74.2,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 644.1,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "it_communication",
      "industryName": "情報通信業",
      "capitalClass": "1000to5000",
      "capitalClassLabel": "1千万円以上-5千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 1745047400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 805867000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 986144,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 83709,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 54830300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 4787200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 454073600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 48164000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 42185600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 939180400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 53.8,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 877.9,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 552.1,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 712.2,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 64.3,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 1316.8,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "it_communication",
      "industryName": "情報通信業",
      "capitalClass": "under1000",
      "capitalClassLabel": "1千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 340477400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 134467500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 173651,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 121524,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 48889200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 558500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 41197000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 3308600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 5921700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 206009900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 60.5,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 697.9,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 290.4,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 406.9,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 48.5,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 1046.9,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "transport_postal",
      "industryName": "運輸業，郵便業",
      "capitalClass": "1000to5000",
      "capitalClassLabel": "1千万円以上-5千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 1781287400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 1225398400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 1128774,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 89459,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 49806400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 2865500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 384959700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 36661800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 45361900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 555889000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 31.2,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 456.3,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 413.7,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 588.8,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 93.5,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 684.5,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "transport_postal",
      "industryName": "運輸業，郵便業",
      "capitalClass": "under1000",
      "capitalClassLabel": "1千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 868013400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 413137900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 615456,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 78167,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 36159000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 529900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 216522300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 11303100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 25005300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 454875500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 52.4,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 655.8,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 410.8,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 469.4,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 63.6,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 983.7,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "wholesale",
      "industryName": "卸売業",
      "capitalClass": "1000to5000",
      "capitalClassLabel": "1千万円以上-5千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 9428250700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 7665314600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 1284910,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 229581,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 159409300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 8340500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 426542500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 76807400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 53947400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 1762936100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 18.7,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 1164,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 433.7,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 730.7,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 41.1,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 1746.1,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "wholesale",
      "industryName": "卸売業",
      "capitalClass": "under1000",
      "capitalClassLabel": "1千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 1702869600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 1172738500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 261883,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 194613,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 82393000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 999800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 69952900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 2717300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 13561900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 530131100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 31.1,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 1161.3,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 329.3,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 428.5,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 32,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 1742,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "retail",
      "industryName": "小売業",
      "capitalClass": "1000to5000",
      "capitalClassLabel": "1千万円以上-5千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 5933826200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 4500161900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 1488306,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 168984,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 80757600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 2527000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 403424800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 50634100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 45576700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 1433664300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 24.2,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 865.1,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 335.7,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 492.9,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 40.7,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 1297.6,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "retail",
      "industryName": "小売業",
      "capitalClass": "under1000",
      "capitalClassLabel": "1千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 3815482000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 2775564900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 1307966,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 386743,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 137852700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 5970300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 261437200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 24273800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 30275700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 1039917100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 27.3,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 613.6,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 241.6,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 371.9,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 44.2,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 920.4,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "real_estate",
      "industryName": "不動産業",
      "capitalClass": "1000to5000",
      "capitalClassLabel": "1千万円以上-5千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 1370427600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 614688200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 302623,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 187384,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 89190900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 4192500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 103751300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 15216400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 10118700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 755739400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 55.1,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 1542.3,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 426.6,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 498.4,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 29.4,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 2313.5,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "real_estate",
      "industryName": "不動産業",
      "capitalClass": "under1000",
      "capitalClassLabel": "1千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 715690300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 130790600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 172915,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 383081,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 103407800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 2335300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 34732600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 3896000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 10917100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 584899700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 81.7,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 1052,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 286.5,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 276,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 26.5,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 1578,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "lodging_food",
      "industryName": "宿泊業，飲食サービス業",
      "capitalClass": "1000to5000",
      "capitalClassLabel": "1千万円以上-5千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 1299805500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 569866300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 1455569,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 47848,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 27166800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 715000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 265652800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 13126000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 21123400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 729939200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 56.2,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 485.5,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 206,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 582.7,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 44.9,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 728.3,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "lodging_food",
      "industryName": "宿泊業，飲食サービス業",
      "capitalClass": "under1000",
      "capitalClassLabel": "1千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 1066798800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 308260200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 870619,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 181458,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 54780100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 4925200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 172471800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 5228900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 14761400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 758538600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 71.1,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 721,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 221.1,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 329,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 33.2,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 1081.5,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "lifestyle_entertainment",
      "industryName": "生活関連サービス業，娯楽業",
      "capitalClass": "1000to5000",
      "capitalClassLabel": "1千万円以上-5千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 1101026100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 650480700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 645101,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 61046,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 26636200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 919300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 160810300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 17277200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 10327400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 450545400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 40.9,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 638,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 292.1,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 451.4,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 47.9,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 957.1,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "lifestyle_entertainment",
      "industryName": "生活関連サービス業，娯楽業",
      "capitalClass": "under1000",
      "capitalClassLabel": "1千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 750528800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 192411500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 1172300,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 203726,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 87407500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 1360500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 210877600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 10948900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 17564800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 558117300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 74.4,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 405.6,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 204.2,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 435.7,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 58.8,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 608.4,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "professional_services",
      "industryName": "学術研究，専門・技術サービス業",
      "capitalClass": "1000to5000",
      "capitalClassLabel": "1千万円以上-5千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 1652553600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 929846600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 812267,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 129767,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 78755300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 4393800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 282606200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 38405900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 29181900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 722707000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 43.7,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 767.2,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 431.1,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 640.8,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 60,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 1150.8,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "professional_services",
      "industryName": "学術研究，専門・技術サービス業",
      "capitalClass": "under1000",
      "capitalClassLabel": "1千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 1093652000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 356930300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 441500,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 383084,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 184603300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 7366300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 147543200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 21051600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 18794300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 736721700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 67.4,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 893.4,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 424.4,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 501.1,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 51.5,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 1340.2,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "medical_welfare",
      "industryName": "医療，福祉業",
      "capitalClass": "1000to5000",
      "capitalClassLabel": "1千万円以上-5千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 359314300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 121065200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 464313,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 15880,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 14883300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 347800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 123170300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 11275200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 9052900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 238249100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 66.3,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 496.2,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 309.1,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 959.1,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 66.6,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 744.2,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "medical_welfare",
      "industryName": "医療，福祉業",
      "capitalClass": "under1000",
      "capitalClassLabel": "1千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 598951200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 78184900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 787122,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 98256,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 46222800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 1618900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 184408100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 17594800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 16301800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 520766300,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 86.9,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 588.2,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 277.3,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 486.9,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 51.1,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 882.3,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "other_services",
      "industryName": "その他のサービス業",
      "capitalClass": "1000to5000",
      "capitalClassLabel": "1千万円以上-5千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 1777409000,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 1103207600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 1115653,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 93029,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 68262700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 2452800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 327878800,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 55374100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 45625400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 674201400,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 37.9,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 557.8,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 384.4,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 760.1,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 74.1,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 836.7,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    },
    {
      "industryCode": "other_services",
      "industryName": "その他のサービス業",
      "capitalClass": "under1000",
      "capitalClassLabel": "1千万円未満",
      "fiscalYear": 2025,
      "arari": {
        "sales": {
          "value": 850199100,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "cogs": {
          "value": 334300600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employees": {
          "value": 618003,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officers": {
          "value": 164052,
          "unit": "人",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": true
        },
        "officerSalary": {
          "value": 80695900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "officerBonus": {
          "value": 1962600,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeSalary": {
          "value": 151122900,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "employeeBonus": {
          "value": 17243200,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "welfare": {
          "value": 22241700,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "grossProfit": {
          "value": 515898500,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "sales - cogs",
          "usedInCalc": true
        },
        "grossMarginRate": {
          "value": 60.7,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / sales * 100",
          "usedInCalc": true
        },
        "atmark": {
          "value": 659.7,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "grossProfit / (employees + officers)",
          "usedInCalc": true
        },
        "laborPerEmployee": {
          "value": 308.4,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(employeeSalary + employeeBonus + welfare) / employees",
          "usedInCalc": true
        },
        "officerCompPerHead": {
          "value": 503.9,
          "unit": "万円",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary + officerBonus) / officers",
          "usedInCalc": false
        },
        "laborShare": {
          "value": 53,
          "unit": "%",
          "sourceId": "S1_houjin_kigyou_toukei_2025",
          "confidence": "confirmed",
          "computed": true,
          "computeFormula": "(officerSalary+officerBonus+employeeSalary+employeeBonus+welfare) / grossProfit * 100",
          "usedInCalc": false
        }
      },
      "fukakachi": {
        "usedInCalc": false,
        "addedValue": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "operatingProfit": {
          "value": null,
          "unit": "万円",
          "sourceId": null,
          "confidence": "unavailable",
          "computed": false,
          "computeFormula": null,
          "usedInCalc": false
        },
        "note": "法人企業統計 表1に存在するが、T2 CSVには収集されていない（付加価値額・営業純益の列が無い）。usedInCalc:falseのため計算には影響しない。将来値を入れる場合もcalc.jsからは参照しない。"
      },
      "atmarkTopEst": {
        "value": 989.5,
        "unit": "万円",
        "sourceId": "S1_houjin_kigyou_toukei_2025",
        "confidence": "estimated",
        "computed": true,
        "computeFormula": "atmark * 1.5",
        "usedInCalc": false,
        "note": "v1画面には出さない（マッチョ確定事項）。将来「業界上位」ベンチマークを追加する場合の予約フィールド。"
      },
      "sourceId": "S1_houjin_kigyou_toukei_2025"
    }
  ],
  "stages": [
    {
      "stageNumber": 1,
      "label": "ステージ1",
      "atmark": {
        "value": 1000,
        "unit": "万円",
        "sourceId": "S4_tanahara_stage_ron",
        "confidence": "estimated",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "basis": "月35万円の生活費からの逆算"
    },
    {
      "stageNumber": 2,
      "label": "ステージ2",
      "atmark": {
        "value": 2000,
        "unit": "万円",
        "sourceId": "S4_tanahara_stage_ron",
        "confidence": "estimated",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "basis": "月35万円の生活費からの逆算"
    },
    {
      "stageNumber": 3,
      "label": "ステージ3",
      "atmark": {
        "value": 3000,
        "unit": "万円",
        "sourceId": "S4_tanahara_stage_ron",
        "confidence": "estimated",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "basis": "月35万円の生活費からの逆算"
    }
  ],
  "minWage": [
    {
      "pref": "北海道",
      "amount": {
        "value": 1075,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月4日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "青森",
      "amount": {
        "value": 1029,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年11月21日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "岩手",
      "amount": {
        "value": 1031,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年12月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "宮城",
      "amount": {
        "value": 1038,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月4日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "秋田",
      "amount": {
        "value": 1031,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和8年3月31日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "山形",
      "amount": {
        "value": 1032,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年12月23日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "福島",
      "amount": {
        "value": 1033,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和8年1月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "茨城",
      "amount": {
        "value": 1074,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月12日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "栃木",
      "amount": {
        "value": 1068,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "群馬",
      "amount": {
        "value": 1063,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和8年3月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "埼玉",
      "amount": {
        "value": 1141,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年11月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "千葉",
      "amount": {
        "value": 1140,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月3日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "東京",
      "amount": {
        "value": 1226,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月3日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "神奈川",
      "amount": {
        "value": 1225,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月4日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "新潟",
      "amount": {
        "value": 1050,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月2日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "富山",
      "amount": {
        "value": 1062,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月12日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "石川",
      "amount": {
        "value": 1054,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月8日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "福井",
      "amount": {
        "value": 1053,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月8日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "山梨",
      "amount": {
        "value": 1052,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年12月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "長野",
      "amount": {
        "value": 1061,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月3日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "岐阜",
      "amount": {
        "value": 1065,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月18日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "静岡",
      "amount": {
        "value": 1097,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年11月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "愛知",
      "amount": {
        "value": 1140,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月18日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "三重",
      "amount": {
        "value": 1087,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年11月21日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "滋賀",
      "amount": {
        "value": 1080,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月5日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "京都",
      "amount": {
        "value": 1122,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年11月21日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "大阪",
      "amount": {
        "value": 1177,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月16日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "兵庫",
      "amount": {
        "value": 1116,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月4日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "奈良",
      "amount": {
        "value": 1051,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年11月16日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "和歌山",
      "amount": {
        "value": 1045,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年11月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "鳥取",
      "amount": {
        "value": 1030,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月4日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "島根",
      "amount": {
        "value": 1033,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年11月17日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "岡山",
      "amount": {
        "value": 1047,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年12月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "広島",
      "amount": {
        "value": 1085,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年11月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "山口",
      "amount": {
        "value": 1043,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月16日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "徳島",
      "amount": {
        "value": 1046,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和8年1月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "香川",
      "amount": {
        "value": 1036,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年10月18日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "愛媛",
      "amount": {
        "value": 1033,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年12月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "高知",
      "amount": {
        "value": 1023,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年12月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "福岡",
      "amount": {
        "value": 1057,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年11月16日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "佐賀",
      "amount": {
        "value": 1030,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年11月21日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "長崎",
      "amount": {
        "value": 1031,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年12月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "熊本",
      "amount": {
        "value": 1034,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和8年1月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "大分",
      "amount": {
        "value": 1035,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和8年1月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "宮崎",
      "amount": {
        "value": 1023,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年11月16日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "鹿児島",
      "amount": {
        "value": 1026,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年11月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    },
    {
      "pref": "沖縄",
      "amount": {
        "value": 1023,
        "unit": "円",
        "sourceId": "S2_chiiki_saitei_chingin_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "effectiveDate": "令和7年12月1日",
      "prevAmount": {
        "value": null,
        "unit": "円",
        "sourceId": null,
        "confidence": "unavailable",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      }
    }
  ],
  "partWage": [
    {
      "pref": "北海道",
      "amount": {
        "value": 1361,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "青森",
      "amount": {
        "value": 1213,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "岩手",
      "amount": {
        "value": 1226,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "宮城",
      "amount": {
        "value": 1375,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "秋田",
      "amount": {
        "value": 1161,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "山形",
      "amount": {
        "value": 1203,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "福島",
      "amount": {
        "value": 1202,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "茨城",
      "amount": {
        "value": 1718,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "栃木",
      "amount": {
        "value": 1416,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "群馬",
      "amount": {
        "value": 1417,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "埼玉",
      "amount": {
        "value": 1480,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "千葉",
      "amount": {
        "value": 1488,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "東京",
      "amount": {
        "value": 1779,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "神奈川",
      "amount": {
        "value": 1819,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "新潟",
      "amount": {
        "value": 1285,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "富山",
      "amount": {
        "value": 1420,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "石川",
      "amount": {
        "value": 1328,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "福井",
      "amount": {
        "value": 1311,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "山梨",
      "amount": {
        "value": 1597,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "長野",
      "amount": {
        "value": 1310,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "岐阜",
      "amount": {
        "value": 1397,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "静岡",
      "amount": {
        "value": 1420,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "愛知",
      "amount": {
        "value": 1452,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "三重",
      "amount": {
        "value": 1427,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "滋賀",
      "amount": {
        "value": 1372,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "京都",
      "amount": {
        "value": 1580,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "大阪",
      "amount": {
        "value": 1658,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "兵庫",
      "amount": {
        "value": 1448,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "奈良",
      "amount": {
        "value": 1587,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "和歌山",
      "amount": {
        "value": 1292,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "鳥取",
      "amount": {
        "value": 1486,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "島根",
      "amount": {
        "value": 1343,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "岡山",
      "amount": {
        "value": 1357,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "広島",
      "amount": {
        "value": 1333,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "山口",
      "amount": {
        "value": 1273,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "徳島",
      "amount": {
        "value": 1356,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "香川",
      "amount": {
        "value": 1271,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "愛媛",
      "amount": {
        "value": 1299,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "高知",
      "amount": {
        "value": 1340,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "福岡",
      "amount": {
        "value": 1424,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "佐賀",
      "amount": {
        "value": 1325,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "長崎",
      "amount": {
        "value": 1365,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "熊本",
      "amount": {
        "value": 1265,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "大分",
      "amount": {
        "value": 1234,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "宮崎",
      "amount": {
        "value": 1274,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "鹿児島",
      "amount": {
        "value": 1272,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    },
    {
      "pref": "沖縄",
      "amount": {
        "value": 1263,
        "unit": "円",
        "sourceId": "S3_chingin_kouzou_kihon_tanjikan_r7",
        "confidence": "confirmed",
        "computed": false,
        "computeFormula": null,
        "usedInCalc": false
      },
      "year": 2025,
      "label": "パート・アルバイトの平均時給（短時間労働者）"
    }
  ]
};

if (typeof module === 'object' && module.exports) {
  module.exports = INDUSTRY_DATA;
}
