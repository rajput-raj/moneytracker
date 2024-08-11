// Home route
app.get('/', function (req, res) {
    Transaction.find({}, function (err, transactions) {
        let totalBalance = 0;

        transactions.forEach(transaction => {
            totalBalance += transaction.amount;
        });

        res.render('home', {
            transactions: transactions,
            totalBalance: totalBalance
        });
    });
});

// Add transaction route
app.post('/add', function (req, res) {
    const transaction = new Transaction({
        description: req.body.description,
        amount: parseFloat(req.body.amount)
    });

    transaction.save(function (err) {
        if (!err) {
            res.redirect('/');
        }
    });
});

// Delete transaction route
app.post('/delete', function (req, res) {
    const transactionId = req.body.transactionId;

    Transaction.findByIdAndRemove(transactionId, function (err) {
        if (!err) {
            res.redirect('/');
        }
    });
});







const transactionSchema = {
    description: String,
    amount: Number,
    date: { type: Date, default: Date.now }
};

const Transaction = mongoose.model('Transaction', transactionSchema);



const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/moneyTrackerDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, function () {
    console.log('Server started on port 3000');
});
