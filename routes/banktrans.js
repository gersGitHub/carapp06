var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs('mongodb://cardb:NvIEWzpvuy5JTFIyR46l7JXZJhsV6Cs05H4U8naF37BAhRZ6ewOagmMKEbBJtrcEyyTdmQxlM7nnrzSFZ07msA==@cardb.documents.azure.com:10250/?ssl=true');

// Get All BankTrans
router.get("/banktrans", function(req, res, next){
    db.banktrans.find(function(err, banktrans){
        if(err){
            res,send(err);
        }
        res.json(banktrans);
    });
});

// Get Single BankTran
router.get("/banktran/:id", function(req, res, next){
    db.banktrans.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, banktran){
        if(err){
            res.send(err);
        }
        res.json(banktran);
    });
});

// Save BankTran
router.post("/banktran", function(req, res, next){
    var banktran = req.body;
    if(!banktran.bankTranDate || !banktran.bankTranRef 
            || !banktran.bankTranDetail || !banktran.bankTranAmnt){
        res.status(400);
        res.json({
            error: "Bad Data"
        });
    } else{
        db.banktrans.save(banktran, function(err, banktran){
            if(err){
            res.send(err);
        }
        res.json(banktran);
        });
    }
});

// Delete BankTran
router.delete("/banktran/:id", function(req, res, next){
    db.banktrans.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, banktran){
        if(err){
            res.send(err);
        }
        res.json(banktran);
    });
});

// Update BankTran
router.put("/banktran/:id", function(req, res, next){
    var banktran = req.body;
    var updBanktran = {};

    if(banktran.bankTranDate && banktran.bankTranRef 
            && banktran.bankTranDetail && banktran.bankTranAmnt){
        updBanktran.banktran.bankTranDate = banktran.banktran.bankTranDate;
        updBanktran.banktran.bankTranRef = banktran.banktran.bankTranRef;
        updBanktran.banktran.bankTranDetail = banktran.banktran.bankTranDetail;
        updBanktran.banktran.bankTranAmnt = banktran.banktran.bankTranAmnt;
    };

    if(!updBanktran){
        res.status(400);
        res.json({
            error: "Bad Data"
        });
    } else {
        db.banktrans.update({_id: mongojs.ObjectId(req.params.id)}, updBanktran, {}, function(err, supplier){
        if(err){
            res.send(err);
        }
        res.json(banktran);
    });
    }

    
});

module.exports = router;