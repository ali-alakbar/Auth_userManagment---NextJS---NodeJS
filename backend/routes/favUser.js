const router = require("express").Router();
const UserModel = require("../models/userModel");

// ========================================================================
// we took with the ID in the backend, which should be the same.
router.post("/add", async (req, res) => {
  const frontendID = req.body.id;
  const frontendUserData = req.body.userData;

  console.log(`The User with ID: {${frontendID}} is Added`);
  UserModel.update(
    { _id: frontendID },
    { $set: { userAdded: frontendUserData } },
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});
router.post("/remove", async (req, res) => {
  const frontendID = req.body.id;
  const frontendUserData = req.body.userData;

  console.log(`The User with ID: {${frontendID}} is removed`);
  UserModel.update(
    { _id: frontendID },
    { $set: { userAdded: frontendUserData } },
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// ========================================================================
// ========================================================================
// ========== REMOVING ==========
// Detect the ID that came from the frontend
// apply find by ID and remove "findByIdAndRemove()"
// router.post("/remove", async (req, res) => {
//   UserModel.update(
//     { _id: frontendID },
//     { $set: { userAdded: false } },
//     (err, result) => {
//       if (err) {
//         res.json(err);
//       } else {
//         res.json(result);
//       }
//     }
//   );
// });
// router.post("/remove", async (req, res) => {
//   const frontendID = req.body.id;
//   UserModel.findByIdAndRemove({ _id: frontendID }, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

module.exports = router;
