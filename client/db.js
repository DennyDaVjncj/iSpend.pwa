let db;
const request=indexedDB.open('expenses',1);

request.onupgradeneeded=ux=>{
    const db=ux.target.result;
    db.createObjectStore('awaitingProccessing',{autoIncrement:true});
};
request.onsuccess=ux=>{
    db=ux.target.result;

    if(navigator.onLine){
        checkDatabase()
    };
};
request.onerror=ux=>{
    console.log('misconfiguration! '+ux.target.errorcode);
};
const saveOffline=record=>{
    const transaction=db.transaction(['awaitingProccessing'],'readwrite');
    const offlineData=transaction.objectStore('awaitingProccessing');
    offlineData.add(record);
};
const checkDatabase=()=>{
    const transaction=db.transaction(['awaitingProccessing']);
}//w17 mini prjct reference!!
//finish this logic
    //test offline
    //data should be synced once online
//remove dist from git ignore
