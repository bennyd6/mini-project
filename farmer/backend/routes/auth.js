const express=require('express')
const Farmer=require('../models/Farmer')
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const fetchfarmer=require('../middleware/fetchfarmer')

const JWT_SECRET='Bennyi$ag00dguy'


const router=express.Router();


//route-1: create a new farmer /api/auth/createfarmer
router.post('/createfarmer',[
    body('FirstName','Enter a valid first name').isLength({ min: 4 }),
    body('LastName','Enter a valid Last name').isLength({ min: 4 }),
    body('phone','Enter a valid phone number'),
    body('password','password must contain atleast 5 characters').isLength({ min: 5 }),
    body('email','enter a valid email').isEmail(),
],async (req,res)=>{
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    
    //checks if there exists already a farmer with same email
    
    try {
        let farmer=await Farmer.findOne({email: req.body.email});
        if(farmer){
            return res.status(400).json({error: "Sorry a farmer with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);
        farmer =await Farmer.create({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            phone: req.body.phone,
            email: req.body.email,
            password: secPass,
        })
        
        const data={
            farmer:{
                id:farmer.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET)
        console.log(authtoken);
        res.json({authtoken})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
    //   .then(farmer => res.json(farmer))
    //   .catch(err=>{console.log(err)
    //     res.json({error:"Please enter a unique value for email",message:err.message})
    //   })
    
    
    // without validator
    // console.log(req.body)
    // const farmer=Farmer(req.body)
    // farmer.save()
    // res.send(req.body)
})


//route-2: login a farmer /api/auth/login
router.post('/login', [
    body('phone').isMobilePhone('any').withMessage('Enter a valid phone number'),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;

    try {
        let farmer = await Farmer.findOne({ phone });

        if (!farmer) {
            console.log("Phone number not found:", phone);
            return res.status(400).json({ error: "Invalid phone number or password" });
        }

        // Debugging password comparison
        console.log("Stored Hashed Password:", farmer.password);
        console.log("Entered Password:", password);

        const passwordCompare = await bcrypt.compare(password, farmer.password);

        if (!passwordCompare) {
            console.log("Password does not match!");
            return res.status(400).json({ error: "Invalid phone number or password" });
        }

        const data = {
            farmer: {
                id: farmer.id
            }
        };

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log("Generated Auth Token:", authtoken);
        res.json({ authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});




// route-3 Get loggedin farmer details using: POST '/api/auth/getfarmer'
router.post('/getfarmer',fetchfarmer,async (req,res)=>{
    try {
        farmerId=req.farmer.id;
        const farmer=await Farmer.findById(farmerId).select("-password")
        res.send(farmer)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})


// route-4: Update coordinates of the farmer /api/auth/recordcoordinates
router.post('/recordcoordinates', fetchfarmer, async (req, res) => {
    const { coordinates } = req.body;

    if (!coordinates || !Array.isArray(coordinates)) {
        return res.status(400).json({ error: "Invalid input. Coordinates should be an array of objects." });
    }

    for (let i = 0; i < coordinates.length; i++) {
        const { latitude, longitude } = coordinates[i];
        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ error: `Invalid coordinate at index ${i}. Each coordinate should have valid latitude and longitude.` });
        }
    }

    try {
        let farmer = await Farmer.findById(req.farmer.id);

        if (!farmer) {
            return res.status(404).json({ error: "Farmer not found" });
        }

        farmer.coordinates = coordinates;

        await farmer.save();

        res.json({ message: "Coordinates updated successfully", coordinates: farmer.coordinates });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



module.exports=router