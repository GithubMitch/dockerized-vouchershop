<template>
 <footer>
   <h1>A footer !</h1>
 </footer>
</template>
<style lang="scss">
  footer{
    flex: 0 1 10%;
    border-top: 1px solid #bb5215;
    background: #ff7514 repeating-linear-gradient(45deg, #ff7514, #f36000a1 100px);
    color: #FFF;
    box-shadow: -3px -4px 1px #00000030;
    margin-top: 3em;

    #FooterContent{
      padding: 1em;
      max-width: 990px;
      margin: 0px auto;
      display: flex;
      justify-content: space-between;
      .block{
        text-align: left;
        a{
          display: block;
          margin-bottom: 17px;
          text-decoration: none;
          color: #FFF;
          border-bottom: 2px solid transparent;
          &.router-link-exact-active{
            border-bottom: 2px solid #FFF;
          }
          &:active{
            transform: translateY(1px)
          }
        }
      }
    }

    #PaymentLogos{
      margin-top: 1.5em;
      background: #FFF;
      border-radius: 7px;
      min-height: 3.5em;
      &:active{
        transform: scale(0.99);
        opacity: 0.99;
      }
      h3{
        color: #717171;
        font-size: 12px;
        border-bottom: orange 1px solid;
      }
    }

    #FooterLogo{
      h3{
        margin-top: 1.5em;
        padding-left: 7px;
        margin-bottom: 5px;
        font-size: 80%;
      }
      img{
        max-width: 120px;
      }
    } 
  }
</style>