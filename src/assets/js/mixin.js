export const dataMixin = {
  data() {
    return {
      tableOptions: {
        tableData: [],
        tableHeight: window.innerHeight - 190 - 47,
        loading: false,
        selection: []
      },
      pageOptions: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50, 100, 200, 300],
        layout: "total, sizes, prev, pager, next, jumper"
      }
    };
  }
};

export const methodsMixin = {
  methods: {
    tblSelectionChange(selection) {
      this.tableOptions.selection = selection;
    },
    pageSizeChange(pageSize) {
      this.pageOptions.pageSize = pageSize;
      this.updateTable();
    },
    currentPageChange(currentPage) {
      this.pageOptions.currentPage = currentPage;
      this.updateTable();
    }
  }
};
