/**
 * ProductControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



const Sails = require("sails/lib/app/Sails");
// const Product = require("../models/Product");
/*const Product = require("../models/Product");*/


module.exports = {
  
  new: async function (req, res) {
      const cafetypes = await Cafetype.find();
      res.view('pages/product/new', { cafetypes });
  },
 

  create: async function (req, res) {
    sails.log.debug("Create product....")
    let params = req.allParams();
    await Product.create(params);
      res.redirect('/product');
  },

  
  


//search button
/*
  find: async function (req, res) {
    sails.log.debug("List all products....")
    let products;
    if (req.query.q && req.query.q.length > 0) {
      products = await Product.find({
        name: {
          'contains': req.query.q
        }
      })
    } else {
      products = await Product.find().populate("cafetype");
    }
    res.view ('pages/product/index', { products: products } );
  }, 
*/


  find: async function (req, res) {
    sails.log.debug("List all products....")
    let products;

    const searchQuery = req.query.q;
    const cafetypeFilter = req.query.cafetype;

    let criteria = {};

    if (searchQuery && searchQuery.length > 0) {
        criteria.name = { 'contains': searchQuery };
    }

    if(cafetypeFilter && !(cafetypeFilter === "-1")){
      sails.log.debug("option all selected")

      if (cafetypeFilter && cafetypeFilter.length > 0) {
        criteria.cafetype = parseInt(cafetypeFilter,10);
    }
    }

    try {

      if (Object.keys(criteria).length > 0) {
          sails.log.debug("Final Criteria:", criteria);

          products = await Product.find({
              where: criteria
          }).populate("cafetype");
      } else {
          // Wenn keine Suchkriterien vorhanden sind, zeige alle Produkte an
          products = await Product.find().populate("cafetype");
      }
  } catch (error) {
      sails.log.error("Error during database query:", error);
  }

  let cafetypes = await Cafetype.find();
  
  res.view('pages/product/index', { products: products, cafetypes:cafetypes });
}, 


  findOne: async function (req, res) {
    sails.log.debug("List single product....")
    let product = await Product.findOne({ id: req.params.id })
    res.view ('pages/product/show', { product: product } );
  },

  destroyOne: async function (req, res) {
    sails.log.debug("Destroy single prodct....")
    await Product.destroyOne({ id: req.params.id });
    res.redirect('/product');
  },
  
  editOne: async function (req, res) {
    sails.log.debug("Edit single product....");
    try {
      let product = await Product.findOne({ id: req.params.id }).populate('cafetype');
      if (!product) {
        sails.log.debug("Product not found.");
          return res.notFound();
      }
      sails.log.debug("Product loaded:", product);

      res.view('pages/product/edit', { product });
  } catch (error) {
      sails.log.error("Error while editing product:", error);
      return res.serverError(error);
  }
},
  

  updateOne: async function (req, res) {
    sails.log.debug("Update single product....")
    let product = await Product.updateOne({ id: req.params.id }).set(req.body);
    res.redirect('/product');
  },

 

  report: async function (req, res) {
    let sql = "select p.id, p.name, p.createdAt, p.updatedAt from product as p order by p.updatedAt desc;";
    var rawResult = await sails.sendNativeQuery(sql);
    
    console.dir(rawResult);
    let entries  = [];
    rawResult.rows.forEach(element => {
      entries.push(element);
    });
    res.view('pages/product/report', { entries });
 },


  uploadImageForm: async function (req, res) {
    sails.log.debug("Upload image form....")
    let product = await Product.findOne({ id: req.params.id })
    res.view('pages/product/uploadImageForm', { product: product });
  },

uploadImage: async function (req, res) {
  sails.log("Upload image for product...")
  // Define the parameters of the upload as an object
  // In this example only the path, wehre to upload the image, is set
  let params = {
    //dirname: require('path').resolve(sails.config.appPath, 'assets/images/meals/')
    adapter: require('skipper-s3'),
    key: sails.config.s3accesskey,
    secret: sails.config.s3secret,
    bucket: 'wetebucket',
    region: 'us-west-2',
  };

  let callback = async function (err, uploadedFiles) {
    if (err) {
      sails.log("Upload Error")
      return res.serverError(err);
    } else {
      sails.log("Uploaded!")
    }
    let fname = require('path').basename(uploadedFiles[0].fd);
    await Product.updateOne({ id: req.params.id }).set({ image:fname });
    return res.redirect('/product');
  };

    // This funvtion is called, once all files are uploaded
    // err indicates if the upload process triggered an error and has been aborted 
    // uploaded files contains an array of the files which have been uploaded, in our case only one.
    await req.file('image').upload(params, callback);
  },

};
