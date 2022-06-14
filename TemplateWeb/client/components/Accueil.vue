<template>
    <div>
        Page réservé aux membres connectés
        {{message}}
    <div>
</template>

<script>
     module.exports = {
        name : "Accueil",
        props: {
            resultlogin:Number,
            message:String
        },
        data(){
            return{
                
            }
        },
        methods : {
        
    
        },
        mounted(){
            //this.$emit("verif-con")
        }
    }

</script>

<style>

