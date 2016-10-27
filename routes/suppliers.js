var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs('mongodb://cardb:NvIEWzpvuy5JTFIyR46l7JXZJhsV6Cs05H4U8naF37BAhRZ6ewOagmMKEbBJtrcEyyTdmQxlM7nnrzSFZ07msA==@cardb.documents.azure.com:10250/?ssl=true', ['suppliers']);

// Get All Suppliers
router.get("/suppliers", function(req, res, next){
    db.suppliers.find(function(err, suppliers){
        if(err){
            res,send(err);
        }
        res.json(suppliers);
    });
});

// Get Single Supplier
router.get("/supplier/:id", function(req, res, next){
    db.suppliers.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, supplier){
        if(err){
            res.send(err);
        }
        res.json(supplier);
    });
});

// Save Supplier
router.post("/supplier", function(req, res, next){
    var supplier = req.body;
    if(!supplier.supName){
        res.status(400);
        res.json({
            error: "Bad Data"
        });
    } else{
        db.suppliers.save(supplier, function(err, supplier){
            if(err){
            res.send(err);
        }
        res.json(supplier);
        });
    }
});

// Delete Supplier
router.delete("/supplier/:id", function(req, res, next){
    db.suppliers.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, supplier){
        if(err){
            res.send(err);
        }
        res.json(supplier);
    });
});

// Update Supplier
router.put("/supplier/:id", function(req, res, next){
    var supplier = req.body;
    var updSupplier = {};

    if(supplier.supName){
        updSupplier.supName = supplier.supName;
    };

    if(!updSupplier){
        res.status(400);
        res.json({
            error: "Bad Data"
        });
    } else {
        db.suppliers.update({_id: mongojs.ObjectId(req.params.id)}, updSupplier, {}, function(err, supplier){
        if(err){
            res.send(err);
        }
        res.json(supplier);
    });
    }
    
});

module.exports = router;