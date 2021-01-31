// let db;
// const request=indexedDB.open('expenses',1);

// request.onupgradeneeded=ux=>{
//     const db=ux.target.result;
//     db.createObjectStore('awaitingProccessing',{autoIncrement:true});
// };
// request.onsuccess=ux=>{
//     db=ux.target.result;

//     if(navigator.onLine){
//         checkDatabase()
//     };
// };
// request.onerror=ux=>{
//     console.log('misconfiguration! '+ux.target.errorcode);
// };
// const saveOffline=record=>{
//     const transaction=db.transaction(['awaitingProccessing'],'readwrite');
//     const offlineData=transaction.objectStore('awaitingProccessing');
//     offlineData.add(record);
// };
// const checkDatabase=()=>{
//     const transaction=db.transaction(['awaitingProccessing']);
// }
export const checkForIDB=()=>{
    if(!window.indexedDB){
        console.log('you browser is lacking B');
        return false;
    }
    return true;
}
export const useIDB=(databaseName,storeName,method,object)=>{
    return new Promise((resolve,reject)=>{
        const request=window.indexedDB.open(databaseName,1);
        let db,tx,store;

        request.onupgradeneeded=ux=>{
            const db=request.result;
            db.createObjectStore(storeName,{keyPath:'_id'});
        };
        request.onerror=ux=>{
            console.log('unable to launch client database!');
        };
        request.onsuccess=ux=>{
            db=request.result;
            tx=db.transaction(storeName,'readwrite');
            store=tx.objectStore(storeName);

            db.onerror=ux=>{
                console.log('misconfiguration!');
            }
            if(method==='put'){
                store.put(object);
            }else if(method==='get'){
                const all=store.getAll()
                all.onsuccess=()=>{
                    resolve(all.result);
                };
            }else if(method==='delete'){
                store.delete(object._id);
            };
            tx.oncomplete=()=>{
                db.close();
            };
        }
        
    })
}

//w17 mini prjct reference!!
//finish this logic
    //test offline
    //data should be synced once online
//remove dist from git ignore
