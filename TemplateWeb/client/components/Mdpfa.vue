<template>
    <div>
        Voici votre code : {{code}}
        <button @click="gotoacceuil">Aller à l'accueil</button>
    </div>
</template>

<script>
     module.exports = {
        name : "Mdpfa",
        props: {
            resultlogin:Number,
            code:String
            
        },
        data(){
            return{
                messagesend:"",
                passwordDecrypt:""
            }
        },
        methods : {
            gotoacceuil(){
                this.$emit('goto-accueil')
            },
            
    
        },
        mounted(){
            //this.$emit("verif-con")
        }
    }

</script>

<style scoped>

</style>

