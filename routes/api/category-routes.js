const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll()
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

Category.create({
  Category_name: "Basketball",
  tagIds: [1, 2, 3, 4]
})
.then((Category) => {
  // if there's product tags, we need to create pairings to bulk create in the ProductTag model
  if (req.body.tagIds.length) {
    const CategoryTagIdArr = req.body.tagIds.map((tag_id) => {
      return {
        Category_id: Category.id,
        tag_id,
      };
    });
    return CategoryTag.bulkCreate(productTagIdArr);
  }
  // if no product tags, just respond
  res.status(200).json(Category);
})
.then((CategoryTagIds) => res.status(200).json(CategoryTagIds))
.catch((err) => {
  console.log(err);
  res.status(400).json(err);
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
