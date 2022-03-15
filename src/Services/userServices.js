import {mainApp,CartApp,OrderApp} from './http';
export const  sideDrawerMenus = ()=>{
    return({
        'wishmaster':[
                {
                    name:'In Progress',
                    icon:'AccountBalanceWalletIcon',
                    action:function(){
                        console.log("in progress for wishmaster");
                    }
                },
                {
                    name:'Delivered',
                    icon:'ManageAccountsIcon',
                    action:function(){
                        console.log("delivered for wishmaster");
                    }
                },
                {
                    name:'For pickup',
                    icon:'FaceIcon',
                    action:function(){
                        console.log("pick for wishmaster");
                    }
                }        
        ],
        'customer':[
            {
                name:'My Orders',
                icon:'FaceIcon',
                action:function(history,dispatch){
                    console.log("in progress for customer");
                    dispatch({type:'CHANGE_SIDE_MENU',payload:{menu:'myorders'}})
                    history.push('/my-orders');
                }
            },
            {
                name:'Account',
                icon:'ManageAccountsIcon',
                action:function(){
                    console.log("delivered for customer");
                }
            },
            {
                name:'Wallet',
                icon:'AccountBalanceWalletIcon',
                action:function(){
                    console.log("pick for customer");
                }
            }        
        ]
    })
}

export const getPlacedOrders = (params) => {
    return mainApp.getRequest('/order/getAll',{params:params})
}

