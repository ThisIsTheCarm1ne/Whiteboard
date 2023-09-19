migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2pn2855zv1jotu3")

  collection.listRule = "Owner = @request.auth.id"
  collection.viewRule = "Owner = @request.auth.id"
  collection.createRule = "Owner = @request.auth.id"
  collection.updateRule = "Owner = @request.auth.id"
  collection.deleteRule = "Owner = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2pn2855zv1jotu3")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
