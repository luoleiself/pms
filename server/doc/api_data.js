define({ "api": [
  {
    "type": "all",
    "url": "/userss",
    "title": "allPathNotMatched",
    "name": "allPath",
    "group": "all",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": "<p>200</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  data: [],\n  msg: 'Not matched to any routing'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controller/index.js",
    "groupTitle": "all"
  },
  {
    "type": "post",
    "url": "/brands",
    "title": "addBrand",
    "name": "addBrand",
    "group": "brands",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>品牌名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>品牌名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pid",
            "description": "<p>所属品牌</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "manufactor_id",
            "description": "<p>供应商id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  name: '品牌名称',\n  desc: '品牌描述'，\n  pid: '',\n  manufactor_id: 1,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '品牌名称', desc: '品牌描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该品牌名称已存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/brands"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/brands.controller.js",
    "groupTitle": "brands"
  },
  {
    "type": "delete",
    "url": "/brands/:id",
    "title": "deleteBrand",
    "name": "deleteBrand",
    "group": "brands",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>品牌id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '品牌名称', desc: '品牌描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '未查询到该品牌信息!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/brands/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/brands.controller.js",
    "groupTitle": "brands"
  },
  {
    "type": "get",
    "url": "/brands/:id",
    "title": "getBrandById",
    "name": "getBrandById",
    "group": "brands",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>brand id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '品牌名称', desc: '品牌描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '未查询到该品牌信息!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/brands/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/brands.controller.js",
    "groupTitle": "brands"
  },
  {
    "type": "get",
    "url": "/brands/tree/:id",
    "title": "getBrandTreeById",
    "name": "getBrandTreeById",
    "group": "brands",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>品牌id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: [\n    { id: 1, name: '品牌名称', desc: '品牌描述', ... ,children:[]}\n    ...\n  ],\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '未查询到该品牌信息!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/brands/tree/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/brands.controller.js",
    "groupTitle": "brands"
  },
  {
    "type": "get",
    "url": "/brands",
    "title": "getBrandsList",
    "name": "getBrandsList",
    "group": "brands",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "manufactor_id",
            "description": "<p>供应商id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "status",
            "description": "<p>状态 1-&gt;启用,0-&gt;禁用</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keys",
            "description": "<p>查询关键字</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-1:",
          "content": "{\n  p: 1,\n  p_size: 10,\n  status: 1,\n  keys: 'example'\n}",
          "type": "json"
        },
        {
          "title": "Request-Example-2:",
          "content": "{\n  status: 1,\n  keys: 'example'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:{\n    p: 1,\n    p_size: 10,\n    total: 30,\n    rows:[\n      { id: 1, name: '品牌名称', desc: '品牌描述', ...},\n      ...\n    ]\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response-2:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:[\n    { id: 1, name: '品牌名称', desc: '品牌描述', ...},\n    ...\n  ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "code",
            "defaultValue": "10200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "msg",
            "defaultValue": "操作成功",
            "description": "<p>提示信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>当前每页条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "total",
            "description": "<p>查询结果总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": true,
            "field": "rows",
            "description": "<p>结果集</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/brands"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/brands.controller.js",
    "groupTitle": "brands"
  },
  {
    "type": "put",
    "url": "/brands/:id",
    "title": "updateBrand",
    "name": "updateBrand",
    "group": "brands",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>品牌id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>品牌名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>品牌名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pid",
            "description": "<p>所属品牌</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "manufactor_id",
            "description": "<p>供应商id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  id: 1\n  name: '品牌名称',\n  desc: '品牌描述'，\n  pid: '',\n  manufactor_id: 1,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '品牌名称', desc: '品牌描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '未查询到该品牌信息!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/brands/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/brands.controller.js",
    "groupTitle": "brands"
  },
  {
    "type": "post",
    "url": "/categories",
    "title": "addCategories",
    "name": "addCategories",
    "group": "categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>分类描述</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pid",
            "description": "<p>父级分类id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   name: '分类名称',\n   desc: '分类描述',\n   pid: ''\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '分类名称', desc: '分类描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该分类名称已存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/categories"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/categories.controller.js",
    "groupTitle": "categories"
  },
  {
    "type": "delete",
    "url": "/categories/:id",
    "title": "deleteCategories",
    "name": "deleteCategories",
    "group": "categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>categories id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '分类名称', desc: '分类描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该分类不存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/categories/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/categories.controller.js",
    "groupTitle": "categories"
  },
  {
    "type": "get",
    "url": "/categories/:id",
    "title": "getCategoriesById",
    "name": "getCategoriesById",
    "group": "categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>categories id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: {id: 1, name: '分类名称', desc: '分类描述', ...},\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '未查询到该分类信息!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/categories/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/categories.controller.js",
    "groupTitle": "categories"
  },
  {
    "type": "get",
    "url": "/categories",
    "title": "getCategoriesList",
    "name": "getCategoriesList",
    "group": "categories",
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:{\n    p: 1,\n    p_size: 10,\n    total: 30,\n    rows:[\n      { id: 1, name: '分类名称', desc: '分类描述', ... },\n      ...\n    ]\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response-2:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:[\n    { id: 1, name: '分类名称', desc: '分类描述', ... },\n    ...\n  ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "code",
            "defaultValue": "10200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "msg",
            "defaultValue": "操作成功",
            "description": "<p>提示信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>当前每页条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "total",
            "description": "<p>查询结果总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": true,
            "field": "rows",
            "description": "<p>结果集</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/categories"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/categories.controller.js",
    "groupTitle": "categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "status",
            "description": "<p>状态 1-&gt;启用,0-&gt;禁用</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keys",
            "description": "<p>查询关键字</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-1:",
          "content": "{\n  p: 1,\n  p_size: 10,\n  status: 1,\n  keys: 'example'\n}",
          "type": "json"
        },
        {
          "title": "Request-Example-2:",
          "content": "{\n  status: 1,\n  keys: 'example'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/categories/tree/:id",
    "title": "getCategoriesTreeById",
    "name": "getCategoriesTreeById",
    "group": "categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>categories id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '分类名称', desc: '分类描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '未查询到该分类信息!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/categories/tree/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/categories.controller.js",
    "groupTitle": "categories"
  },
  {
    "type": "put",
    "url": "/categories/:id",
    "title": "updateCategories",
    "name": "updateCategories",
    "group": "categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>categories id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>分类描述</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pid",
            "description": "<p>父级分类id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   id: 1,\n   name: '分类名称',\n   desc: '分类描述',\n   pid: '',\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '分类名称', desc: '分类描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该分类不存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/categories/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/categories.controller.js",
    "groupTitle": "categories"
  },
  {
    "type": "post",
    "url": "/goods",
    "title": "addGoods",
    "name": "addGoods",
    "group": "goods",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>商品名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keys",
            "description": "<p>商品关键字</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>商品描述</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "category_id",
            "description": "<p>分类id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "brand_id",
            "description": "<p>品牌id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  name: '商品名称',\n  desc: '商品描述'，\n  keys: '商品关键字',\n  category_id: 1,\n  brand_id: 1,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '商品名称', keys: '商品关键字', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该商品名称已存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/goods"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/goods.controller.js",
    "groupTitle": "goods"
  },
  {
    "type": "delete",
    "url": "/goods/:id",
    "title": "deleteGoods",
    "name": "deleteGoods",
    "group": "goods",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>商品id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '商品名称', desc: '商品描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该商品不存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/goods/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/goods.controller.js",
    "groupTitle": "goods"
  },
  {
    "type": "get",
    "url": "/goods/:id",
    "title": "getBoodsById",
    "name": "getBoodsById",
    "group": "goods",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>goods id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '商品名称', keys: '商品关键字', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '未查询到该商品信息!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/goods/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/goods.controller.js",
    "groupTitle": "goods"
  },
  {
    "type": "get",
    "url": "/brands",
    "title": "getGoodsList",
    "name": "getGoodsList",
    "group": "goods",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "category_id",
            "description": "<p>分类id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "brand_id",
            "description": "<p>品牌id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "status",
            "description": "<p>状态 1-&gt;启用,0-&gt;禁用</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keys",
            "description": "<p>查询关键字</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-1:",
          "content": "{\n  p: 1,\n  p_size: 10,\n  status: 1,\n  keys: 'example'\n}",
          "type": "json"
        },
        {
          "title": "Request-Example-2:",
          "content": "{\n  status: 1,\n  keys: 'example'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:{\n    p: 1,\n    p_size: 10,\n    total: 30,\n    rows:[\n      { id: 1, name: '商品名称', keys: '商品关键字', ... },\n      ...\n    ]\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response-2:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:[\n    { id: 1, name: '商品名称', keys: '商品关键字', ... },\n    ...\n  ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "code",
            "defaultValue": "10200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "msg",
            "defaultValue": "操作成功",
            "description": "<p>提示信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>当前每页条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "total",
            "description": "<p>查询结果总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": true,
            "field": "rows",
            "description": "<p>结果集</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/goods"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/goods.controller.js",
    "groupTitle": "goods"
  },
  {
    "type": "put",
    "url": "/goods/:id",
    "title": "updateGoods",
    "name": "updateGoods",
    "group": "goods",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>商品id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>商品名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>商品描述</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keys",
            "description": "<p>商品关键字</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "category_id",
            "description": "<p>分类id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "brand_id",
            "description": "<p>品牌id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  id: 1\n  name: '商品名称',\n  desc: '商品描述'，\n  keys: '商品关键字',\n  category_id: 1,\n  brand_id: 1,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '商品名称', desc: '商品描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该商品不存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/goods/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/goods.controller.js",
    "groupTitle": "goods"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "login",
    "name": "login",
    "group": "login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n   username: 'zhangsan',\n   password: 'ejyff8dagdsa8987f7das798gda789'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '用户姓名', username: '登录用户名', password:'', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '密码错误!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10401,\n  msg: '用户状态未启用!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该用户名不存在!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/login"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/login.controller.js",
    "groupTitle": "login"
  },
  {
    "type": "delete",
    "url": "/login",
    "title": "logout",
    "name": "logout",
    "group": "login",
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '用户姓名', username: '登录用户名', password:'', ... },\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/login"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/login.controller.js",
    "groupTitle": "login"
  },
  {
    "type": "post",
    "url": "/manufactors",
    "title": "addManufactors",
    "name": "addManufactors",
    "group": "manufactors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>供应商名称</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "desc",
            "description": "<p>供应商描述</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "address",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "contact",
            "description": "<p>联系人</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "telephone",
            "description": "<p>联系电话</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "fax",
            "description": "<p>传真</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "email",
            "description": "<p>邮箱</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   name: '供应商名称',\n   desc: '供应商描述',\n   address: '地址',\n   contact: '联系人',\n   telephone: '联系电话',\n   fax: '传真',\n   email: '邮箱'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '供应商名称', desc: '供应商描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该供应商名称已存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/manufactors"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/manufactors.controller.js",
    "groupTitle": "manufactors"
  },
  {
    "type": "delete",
    "url": "/manufactors/:id",
    "title": "deleteManufactors",
    "name": "deleteManufactors",
    "group": "manufactors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>manufactor id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '供应商名称', desc: '供应商描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该供应商不存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/manufactors/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/manufactors.controller.js",
    "groupTitle": "manufactors"
  },
  {
    "type": "get",
    "url": "/manufactors/:id",
    "title": "getManufactorsById",
    "name": "getManufactorsById",
    "group": "manufactors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>manufactor id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '供应商名称', desc: '供应商描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '未查询到该供应商信息!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/manufactors/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/manufactors.controller.js",
    "groupTitle": "manufactors"
  },
  {
    "type": "get",
    "url": "/manufactors",
    "title": "getManufactorsList",
    "name": "getManufactorsList",
    "group": "manufactors",
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:{\n    p: 1,\n    p_size: 10,\n    total: 30,\n    rows:[\n      { id: 1, name: '供应商名称', desc: '供应商描述', ... },\n      ...\n    ]\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response-2:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:[\n    { id: 1, name: '分类名称', desc: '分类描述', ... },\n    ...\n  ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "code",
            "defaultValue": "10200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "msg",
            "defaultValue": "操作成功",
            "description": "<p>提示信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>当前每页条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "total",
            "description": "<p>查询结果总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": true,
            "field": "rows",
            "description": "<p>结果集</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/manufactors"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/manufactors.controller.js",
    "groupTitle": "manufactors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "status",
            "description": "<p>状态 1-&gt;启用,0-&gt;禁用</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keys",
            "description": "<p>查询关键字</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-1:",
          "content": "{\n  p: 1,\n  p_size: 10,\n  status: 1,\n  keys: 'example'\n}",
          "type": "json"
        },
        {
          "title": "Request-Example-2:",
          "content": "{\n  status: 1,\n  keys: 'example'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/manufactors/:id",
    "title": "updateManufactors",
    "name": "updateManufactors",
    "group": "manufactors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>manufactor id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>供应商名称</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "desc",
            "description": "<p>供应商描述</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "address",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "contact",
            "description": "<p>联系人</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "telephone",
            "description": "<p>联系电话</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "fax",
            "description": "<p>传真</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "email",
            "description": "<p>邮箱</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   name: '供应商名称',\n   desc: '供应商描述',\n   address: '地址',\n   contact: '联系人',\n   telephone: '联系电话',\n   fax: '传真',\n   email: '邮箱'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, name: '供应商名称', desc: '供应商描述', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该供应商不存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/manufactors/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/manufactors.controller.js",
    "groupTitle": "manufactors"
  },
  {
    "type": "post",
    "url": "/purchase",
    "title": "addPurchase",
    "name": "addPurchase",
    "group": "purchase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "goods_id",
            "description": "<p>goods id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "price",
            "description": "<p>单价</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "amount",
            "description": "<p>数量</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n   goods_id: 1,\n   price: '',\n   amount: ''\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, price: '单价', amount: '数量', ... },\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/purchase"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/purchase.controller.js",
    "groupTitle": "purchase"
  },
  {
    "type": "delete",
    "url": "/purchase/:id",
    "title": "deletePurchase",
    "name": "deletePurchase",
    "group": "purchase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>purchase id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, price: '单价', amount: '数量', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该采购信息不存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/purchase/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/purchase.controller.js",
    "groupTitle": "purchase"
  },
  {
    "type": "get",
    "url": "/purchase/:id",
    "title": "getPurchaseById",
    "name": "getPurchaseById",
    "group": "purchase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>purchase id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, price: '单价', amount: '数量', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '未查询到该采购信息!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/purchase/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/purchase.controller.js",
    "groupTitle": "purchase"
  },
  {
    "type": "get",
    "url": "/purchase",
    "title": "getPurchaseList",
    "name": "getPurchaseList",
    "group": "purchase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "start_time",
            "description": "<p>开始时间,日期时间戳秒数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "end_time",
            "description": "<p>结束时间,日期时间戳秒数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "goods_id",
            "description": "<p>商品id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n   P: 1,\n   p_size: 10,\n   start_time: 1564395476,\n   end_time: 1564395476,\n   goods_id: 1,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:{\n    p: 1,\n    p_size: 10,\n    total: 30,\n    rows:[\n      { id: 1, price: '单价', amount: '数量', ... },\n      ...\n    ]\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response-2:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:[\n    { id: 1, price: '单价', amount: '数量', ... },\n    ...\n  ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "code",
            "defaultValue": "10200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "msg",
            "defaultValue": "操作成功",
            "description": "<p>提示信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>当前每页条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "total",
            "description": "<p>查询结果总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": true,
            "field": "rows",
            "description": "<p>结果集</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/purchase"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/purchase.controller.js",
    "groupTitle": "purchase"
  },
  {
    "type": "put",
    "url": "/purchase/:id",
    "title": "updatePurchase",
    "name": "updatePurchase",
    "group": "purchase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>purchase id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "goods_id",
            "description": "<p>goods id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "price",
            "description": "<p>单价</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "amount",
            "description": "<p>数量</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n   goods_id: 1,\n   price: '',\n   amount: ''\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, price: '单价', amount: '数量', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该采购信息不存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/purchase/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/purchase.controller.js",
    "groupTitle": "purchase"
  },
  {
    "type": "get",
    "url": "/roles",
    "title": "getRolesList",
    "name": "getRolesList",
    "group": "roles",
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:{\n    p: 1,\n    p_size: 10,\n    total: 30,\n    rows:[\n      { id: 1, name: '角色名称', desc: '角色描述', ... },\n      ...\n    ]\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response-2:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:[\n    { id: 1, name: '角色名称', desc: '角色描述', ... },\n    ...\n  ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "code",
            "defaultValue": "10200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "msg",
            "defaultValue": "操作成功",
            "description": "<p>提示信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>当前每页条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "total",
            "description": "<p>查询结果总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": true,
            "field": "rows",
            "description": "<p>结果集</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/roles"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/roles.controller.js",
    "groupTitle": "roles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "status",
            "description": "<p>状态 1-&gt;启用,0-&gt;禁用</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keys",
            "description": "<p>查询关键字</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-1:",
          "content": "{\n  p: 1,\n  p_size: 10,\n  status: 1,\n  keys: 'example'\n}",
          "type": "json"
        },
        {
          "title": "Request-Example-2:",
          "content": "{\n  status: 1,\n  keys: 'example'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/sales",
    "title": "addSales",
    "name": "addSales",
    "group": "sales",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "goods_id",
            "description": "<p>goods id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "price",
            "description": "<p>单价</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "amount",
            "description": "<p>数量</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n   goods_id: 1,\n   price: '',\n   amount: ''\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, price: '单价', amount: '数量', ... },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '销售数量不能大于库存数量',\n  data: [],\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/sales"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/sales.controller.js",
    "groupTitle": "sales"
  },
  {
    "type": "delete",
    "url": "/sales/:id",
    "title": "deleteSales",
    "name": "deleteSales",
    "group": "sales",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>sales id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, price: '单价', amount: '数量', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该销售信息不存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/sales/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/sales.controller.js",
    "groupTitle": "sales"
  },
  {
    "type": "get",
    "url": "/sales/:id",
    "title": "getSalesById",
    "name": "getSalesById",
    "group": "sales",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>sales id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, price: '单价', amount: '数量', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '未查询到该销售信息!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/sales/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/sales.controller.js",
    "groupTitle": "sales"
  },
  {
    "type": "get",
    "url": "/sales",
    "title": "getSalesList",
    "name": "getSalesList",
    "group": "sales",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "start_time",
            "description": "<p>开始时间,日期时间戳秒数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "end_time",
            "description": "<p>结束时间,日期时间戳秒数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "goods_id",
            "description": "<p>商品id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n   P: 1,\n   p_size: 10,\n   start_time: 1564395476,\n   end_time: 1564395476,\n   goods_id: 1,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:{\n    p: 1,\n    p_size: 10,\n    total: 30,\n    rows:[\n      { id: 1, price: '单价', amount: '数量', ... },\n      ...\n    ]\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response-2:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:[\n    { id: 1, price: '单价', amount: '数量', ... },\n    ...\n  ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "code",
            "defaultValue": "10200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "msg",
            "defaultValue": "操作成功",
            "description": "<p>提示信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>当前每页条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "total",
            "description": "<p>查询结果总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": true,
            "field": "rows",
            "description": "<p>结果集</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/sales"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/sales.controller.js",
    "groupTitle": "sales"
  },
  {
    "type": "put",
    "url": "/sales/:id",
    "title": "updateSales",
    "name": "updateSales",
    "group": "sales",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>sales id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "goods_id",
            "description": "<p>goods id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "price",
            "description": "<p>单价</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "amount",
            "description": "<p>数量</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n   goods_id: 1,\n   price: '',\n   amount: ''\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: { id: 1, price: '单价', amount: '数量', ... },\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该销售信息不存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '销售数量不能大于库存数量!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/sales/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/sales.controller.js",
    "groupTitle": "sales"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "addUser",
    "name": "addUser",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>姓名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>登陆用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登陆密码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "sex",
            "description": "<p>性别 1-&gt;男，0-&gt;女</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "telephone",
            "description": "<p>电话</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "department",
            "description": "<p>部门</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "role_id",
            "description": "<p>角色id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  name: '张三'\n  username: 'zhangsan',\n  password: '123456',\n  sex: 1,\n  address: '北京市朝阳区朝阳路1号',\n  telephone: '13112345678',\n  department: '系统部',\n  role_id: [1, 2]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "code",
            "defaultValue": "10200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "msg",
            "defaultValue": "操作成功",
            "description": "<p>提示信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "result",
            "description": "<p>结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:{\n    id: 1,\n    name: '张三',\n    username: 'zhangsan',\n    ...\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10403,\n  msg: '该登陆用户名已存在!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/users/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/users.controller.js",
    "groupTitle": "users"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "deleteUser",
    "name": "deleteUser",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "code",
            "defaultValue": "10200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "msg",
            "defaultValue": "操作成功",
            "description": "<p>提示信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "result",
            "description": "<p>结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:{\n    id: 1,\n    name: '张三',\n    username: 'zhangsan',\n    ...\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该用户不存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/users/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/users.controller.js",
    "groupTitle": "users"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "getUserById",
    "name": "getUserById",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "code",
            "defaultValue": "10200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "msg",
            "defaultValue": "操作成功",
            "description": "<p>提示信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "data",
            "description": "<p>结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data: {\n    id: 1,\n    name: '张三',\n    username: 'zhangsan',\n    ...\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该用户不存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/users/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/users.controller.js",
    "groupTitle": "users"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "getUsersList",
    "name": "getUsersList",
    "group": "users",
    "success": {
      "examples": [
        {
          "title": "Success-Response-1:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:{\n    p: 1,\n    p_size: 10,\n    total: 30,\n    rows:[\n      {id: 1, name: '张三', username: 'zhangsan', ...},\n      ...\n    ]\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response-2:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:[\n    {id: 1, name: '张三', username: 'zhangsan', ...},\n    ...\n  ]\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "code",
            "defaultValue": "10200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "msg",
            "defaultValue": "操作成功",
            "description": "<p>提示信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>当前页码</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>当前每页条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "total",
            "description": "<p>查询结果总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": true,
            "field": "rows",
            "description": "<p>结果集</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/users"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/users.controller.js",
    "groupTitle": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "p_size",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "status",
            "description": "<p>状态 1-&gt;启用,0-&gt;禁用</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "keys",
            "description": "<p>查询关键字</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example-1:",
          "content": "{\n  p: 1,\n  p_size: 10,\n  status: 1,\n  keys: 'example'\n}",
          "type": "json"
        },
        {
          "title": "Request-Example-2:",
          "content": "{\n  status: 1,\n  keys: 'example'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "updateUser",
    "name": "updateUser",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>user id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>姓名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>登陆用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登陆密码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "sex",
            "description": "<p>性别 1-&gt;男，0-&gt;女</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "telephone",
            "description": "<p>电话</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "department",
            "description": "<p>部门</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "role_id",
            "description": "<p>角色id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  id: 1\n  name: '张三'\n  username: 'zhangsan',\n  password: '123456',\n  sex: 1,\n  address: '北京市朝阳区朝阳路1号',\n  telephone: '13112345678',\n  department: '系统部',\n  role_id: [1, 2]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "code",
            "defaultValue": "10200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "msg",
            "defaultValue": "操作成功",
            "description": "<p>提示信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": true,
            "field": "result",
            "description": "<p>结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10200,\n  msg: '操作成功',\n  data:{\n    id: 1,\n    name: '张三',\n    username: 'zhangsan',\n    ...\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10404,\n  msg: '该用户不存在!',\n  data: []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  code: 10400,\n  msg: '请求参数错误!',\n  data: []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:9999/api/users/:id"
      }
    ],
    "version": "0.1.0",
    "filename": "server/controller/users.controller.js",
    "groupTitle": "users"
  }
] });
