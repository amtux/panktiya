import SQLite from 'react-native-sqlite-storage';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class PankityaDBManager {
    constructor() {
        this.db = SQLite.openDatabase(
            {name : "Panktiya.db", createFromLocation : 1},
            this.successCB,
            this.errorCB
        );
    }

    getPankti(cb){
        this.getNumberOfPanktiya((count) => {
            const pankti_id = getRandomInt(1, count);
            this.getPanktiRow(pankti_id, (pankti_row) => {
                if(pankti_row){
                    this.getVerses(pankti_row['start_id'], pankti_row['end_id'], (verses)=>{
                        cb(verses);
                    });
                }
            });
        });

        // this.db.transaction((tx) => {
        //     tx.executeSql('SELECT COUNT(*) FROM shabad', [], (tx, results) => {
        //         const shabad_row_id = getRandomInt(1, results.rows.item(0)['COUNT(*)']);
        //         this.getVerses(shabad_row_id, shabad_row_id, (verses)=>{
        //             cb(verses);
        //         });
        //     });
        // });
    }

    getNumberOfPanktiya(cb){
        this.db.transaction((tx) => {
            tx.executeSql('SELECT COUNT(*) FROM panktiya', [], (tx, results) => {
                cb(results.rows.item(0)['COUNT(*)'])
            });
        });
    }

    getPanktiRow(id, cb){
        this.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM panktiya WHERE _id='+id, [], (tx, results) => {
                if(results.rows.length > 0){
                    cb(results.rows.item(0));
                }
                else{
                    cb(null);
                }
            });
        });
    }


    getVerses(start_id, end_id, cb){
        this.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM shabad WHERE _id>='+start_id+' AND _id<='+end_id+';', [], (tx, results) => {
                if(results.rows.length > 0){
                    var ret = { verses: [], writer: undefined };
                    var writer_id = undefined;
                    for(var i = 0; i < results.rows.length; i++){
                        var verse = results.rows.item(i);
                        if(writer_id != undefined && writer_id != verse.writer_id){
                            alert('Error: 1112, please report this.');
                        }
                        writer_id = verse.writer_id;
                        ret.verses.push(verse);
                    }
                    this.getWriter(writer_id, (writer_item) => {
                        ret.writer = writer_item.writer_english;
                        cb(ret);
                    });
                }
                else{
                    cb(null);
                }
            });
        });
    }

    getWriter(id, cb){
        this.db.transaction((tx) => {
            tx.executeSql('SELECT * FROM writer WHERE _id='+id, [], (tx, results) => {
                if(results.rows.length > 0){
                    cb(results.rows.item(0));
                }
                else{
                    cb(null);
                }
            });
        });
    }


    errorCB(err) {
        console.log("SQL Error: " + err);
    }

    successCB() {
        console.log("SQL executed fine");
    }

    openCB() {
        console.log("Database OPENED");
    }
    
};

export default new PankityaDBManager();