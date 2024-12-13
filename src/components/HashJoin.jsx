import { Relation1 } from "../relations/relation1";
import { Relation2 } from "../relations/relation2";
import React, { useState, useEffect } from "react";
import './hashstyles.css'

/* In this project, there are functions relating to the hash join implementation, and 
functions that just assist with React rendering. I'll highlight the important bits down
below */


function HashJoin() {

    const [FinalResult, setFinalResult] = useState([]);
    const hashFunction = (key) => key % 11; // Here is hash function for hashjoin
                                            //Take the key attribute in each record and mod 11

    useEffect(() => {
       
        /*Here is the "Partioning" part of my algorithm. I'm separating
        records in the first relation into a hashmap. */
        const hashedMap = new Map();            
        Relation1.forEach((row) => {            //For each record in a relation
            const hashValue = hashFunction(row[1]); // Hash the join on attribute, Im choosing the second
            if (!hashedMap.has(hashValue)) { // If this bucket doesn't already exist
                hashedMap.set(hashValue, []); //Create a new bucket
            }
            hashedMap.get(hashValue).push(row); //Once a bucket is ensured, push that row onto it
        });

        const finalset = [];

        /* Now we're "Probing" the second relation. We've already defined the hashmap
        and the hashfunction, now we're just sorting Relation 2 into the predefined buckets */
        Relation2.forEach((row) => {
            const hashValue = hashFunction(row[1]);
            if (!hashedMap.has(hashValue)) {
                hashedMap.set(hashValue, []);
            }

            else {
                finalset.push(hashedMap.get(hashValue))
            }

            hashedMap.get(hashValue).push(row);
        });

        //Here, Im just converting the HashMap to an array to Display it easier
        const joinedRelation = [];
        finalset.forEach((bucket) => {
            bucket.forEach((item) => {
                joinedRelation.push(item);
            });
        });
        setFinalResult(joinedRelation);


    }, []);


    return (
        <div className="background">
           <div className="Heading">Hash Join Results</div>
            <div>
                {FinalResult.map((value, index) => {
                    if(index == 0) {

                        return (
                            <div key = {index} className="Table1">
                                {JSON.stringify(FinalResult[index])}
                                {JSON.stringify(FinalResult[index + 1])}
                            </div>
                        )
                    }
                    else if (index == 2) {

                        return (
                            <div key = {index} className="Table2">
                                {JSON.stringify(FinalResult[index])}
                                {JSON.stringify(FinalResult[index + 1])}
                            </div>
                        )
                    }

                    else if (index == 4) {

                        return (
                            <div key = {index} className="Table3">
                                {JSON.stringify(FinalResult[index])}
                                {JSON.stringify(FinalResult[index + 1])}
                            </div>
                        )
                    }
                }

                
                   
                )}
            </div>
        </div>
    );
}

export default HashJoin;
