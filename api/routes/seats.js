const express = require('express');
const seatsRoutes = express.Router();
const bodyParser = require('body-parser');

seatsRoutes.use(bodyParser.urlencoded({ extended: true }));

const Seat = require('../models/seats');

seatsRoutes.route('/')
    .get(async function(req, res) {
        try{
            let seats = await Seat.find({})
            if(seats != null){
                res.status(200);
                res.json([seats, {message: 'List of seats found!'}]);
            }else{
                res.status(404);
                res.json({message: 'ERROR 404: No seats found!'});
            }
        }catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
    });

seatsRoutes.route('/:nseat')
    .post(async function(req,res){
        try{
            var numberOfSeat = req.params.nseat;
            var saved=[];
            for(let i=0 ; i<numberOfSeat; i++) {
                var seat = new Seat();
                seat.booked = false;
                let s=await seat.save();
                saved.push(s);

            }
            if(saved.length > 0){
                res.status(201);
                res.json([saved , {message: 'Seats correctly created'}]);
            }else{
                res.status(404);
                res.json({message: 'ERROR 404: Seats not created!'});
            }
        }catch(error){
			res.status(500);
			res.json({message: 'ERROR 500: Local server error!'});
		}
    });

module.exports = seatsRoutes;