migrate((db) => {
  const collection = new Collection({
    "id": "2pn2855zv1jotu3",
    "created": "2023-09-08 08:24:39.557Z",
    "updated": "2023-09-08 08:24:39.557Z",
    "name": "TODOLists",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jxz9icoj",
        "name": "Title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "41jdrvls",
        "name": "IsDone",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "ma2seaqa",
        "name": "Tasks",
        "type": "json",
        "required": true,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "r1bcck7s",
        "name": "Owner",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2pn2855zv1jotu3");

  return dao.deleteCollection(collection);
})
