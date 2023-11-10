import "@grapecity/wijmo.styles/wijmo.css";

import * as wjcGrid from "@grapecity/wijmo.react.grid";
import * as wjGrid from "@grapecity/wijmo.grid";

import "./style.css";

const schema = {
  __grid__: "grid",
  options: {
    checkbox: true,
    edit: false,
  },
  head: [
    [
      { id: "country", label: "country" },
      { id: "sales", label: "sales" },
      { id: "expenses", label: "expenses" },
      { id: "active", label: "active" },
    ],
  ],
  body: [
    [
      { cel: [{ id: "id" }] },
      { cel: [{ id: "textField" }] },
      { cel: [{ id: "passwordField" }] },
      { cel: [{ id: "integerField" }] },
      { cel: [{ id: "selectField" }] },
      { cel: [{ id: "radioField" }] },
      { cel: [{ id: "dateField" }] },
      { cel: [{ id: "textareaField" }] },
    ],
  ],
};

const getData = () => {
  var countries = "US,Germany,UK,Japan".split(",");
  var data = [];
  for (var i = 0; i < 20; i++) {
    data.push({
      id: i,
      country: countries[i % countries.length],
      active: i % 5 != 0,
      downloads: Math.round(Math.random() * 200000),
      sales: Math.random() * 100000,
      expenses: Math.random() * 50000,
    });
  }
  return data;
};

const Grid = () => {
  const cellEditEnded = (s, e) => {
    let col = s.columns[e.col];
    console.log(e);
  };

  const initialized = (flexGrid) => {
    // create extra header row
    var extraRow = new wjGrid.Row();
    extraRow.allowMerging = true;

    var extraRow2 = new wjGrid.Row();
    extraRow2.allowMerging = true;

    //
    // add extra header row to the grid
    var panel = flexGrid.columnHeaders;
    panel.rows.splice(0, 0, extraRow);

    // var panel = flexGrid.columnHeaders;
    panel.rows.splice(0, 0, extraRow2);

    //
    // populate the extra header row
    for (let colIndex = 0; colIndex <= 1; colIndex++) {
      panel.setCellData(1, colIndex, "Amounts");
    }

    for (let colIndex = 2; colIndex <= 3; colIndex++) {
      panel.setCellData(1, colIndex, "tt");
    }

    for (let colIndex = 0; colIndex <= 3; colIndex++) {
      panel.setCellData(0, colIndex, "abc");
    }

    //
    // merge "Country" and "Active" headers vertically
    // ["country", "active"].forEach(function (binding) {
    //   let col = flexGrid.getColumn(binding);
    //   col.allowMerging = true;
    //   panel.setCellData(0, col.index, col.header);
    // });

    // //
    // // center-align merged header cells
    // flexGrid.formatItem.addHandler(function (s, e) {
    //   if (e.panel == s.columnHeaders && e.range.rowSpan > 1) {
    //     var html = e.cell.innerHTML;
    //     e.cell.innerHTML = '<div class="v-center">' + html + "</div>";
    //   }
    // });
    // flexGrid.autoGenerateColumns = false;
    // flexGrid.itemsSource = getData();
  };

  const head = schema.head;
  const body = schema.body;

  return (
    <wjcGrid.FlexGrid allowMerging="ColumnHeaders" alternatingRowStep={0} initialized={initialized}>
      <wjcGrid.FlexGridColumn binding="country" header="Country" allowMerging={true} />
      <wjcGrid.FlexGridColumn binding="sales" header="Sales" format="n2" />
      <wjcGrid.FlexGridColumn binding="expenses" header="Expenses" format="n2" />
      <wjcGrid.FlexGridColumn binding="active" header="Active" allowMerging={true} />
    </wjcGrid.FlexGrid>
  );
};

export const WijmoGrid = () => {
  return <Grid />;
};
