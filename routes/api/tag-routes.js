const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll()
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post('/', (req, res) => {
  Tag.create({
    Tag_name: "Basketball",
    tagIds: [1, 2, 3, 4]
  })
  .then((Tag) => {
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      const TagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          Tag_id: Tag.id,
        };
      });
      return Tag.bulkCreate(TagIdArr);
    }
  // if no product tags, just respond
  res.status(200).json(Tag);
})
.then((TagIds) => res.status(200).json(TagIds))
.catch((err) => {
  console.log(err);
  res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
}); 

module.exports = router;
