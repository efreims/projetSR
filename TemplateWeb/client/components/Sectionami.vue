<template>
    <div>
        <h1>Contacts</h1>
        <div class="list">
            <div v-for="(user,index) in listami" :key="index" class="contact">
                <!-- <h2> Ami   {{index + 1}}</h2> -->
                <img src="../ressources/contact.PNG" alt="">
                <p @click="afficherConv(user.amiId)">{{user.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
     module.exports = {
        name : "ListeMembres",
        props: {
            listami:Array
        },
        data(){
            return{
                
            }
        },
        methods : {
            accept(relationId){
                this.$emit('accept-ami',relationId)
            },
            afficherConv(id){
                this.$emit('afficher-conv',id)
            }
    
        },
        mounted(){
            //this.$emit("verif-con")
        }
    }

</script>

<style scoped>

h1{
    color: rgb(178, 180, 180);
    text-shadow: 1px 1px 0px rgb(170, 170, 170);
    font-weight: 500;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 5px;
}

p{
    cursor: pointer;
    /* padding-top: 6px; */
    
    font-size : 1.3rem;
}

p:hover{
    color : rgb(191, 43, 124);
}

.contact{
    display : flex;
    justify-content: space-between;
    padding: 3%;
    border-bottom: 1px solid #D4D3E8 ;
    width: 70%; 
}

.contact:hover{
    border-color : rgb(126, 198, 233);
}

.contact img{
    width: 1.3rem;
    height: 1.3rem;
}

.list{
    display :flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
}
</style>

