<template>
    <div class="chatBottom">
            <div class="chatArea">
                <textarea class="chatAreaInput"></textarea>
                <div class="chatJiahaoBtn iconfont icon-jiahao"></div>
                <div class="chatSendBtn iconfont icon-fasong"></div>
            </div>
            <div class="chatCopyright">
                <i class="el-icon-chat-dot-round"></i> Powered by Wolf
            </div>
        </div>
</template>


<style>
  .chatArea{
        margin: 0px 10px;
        margin-bottom: 10px;
        display: flex;
        padding: 6px 5px;
        align-items: center;
        flex:1;
        box-shadow: 0 5px 30px rgb(50 50 93 / 8%), 0 1px 3px rgb(0 0 0 / 5%);
        border-radius: 10px;
        background: #fff;
    }
    .chatArea .iconfont{
        color: #383838;
        font-size: 18px;
        margin: 0px 5px;
        cursor: pointer;
    }
    .chatArea .iconfont:hover{
        color: #409eff;
    }
    .chatAreaInput{
        border-radius: 10px;
        border: none;
        flex: 1;
        outline: none;
        resize: none;
        box-sizing: border-box;
        color: #505050;
        min-height: 35px;
        font-size: 16px;
    }
    .chatCopyright{
        color: #999a9b;
        font-size: 12px;
        text-align: center;
        margin-bottom: 10px;
        filter: grayscale(1);
        opacity: .9;
        font-family: Inter,-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Tahoma,Arial,sans-serif;
    }

</style>