<template>
    <dark-card>
        <div class="hot-art-header clear-float">
            <span class="header-title">{{ title }}</span>
            <el-button class="header-refresh" type="text" @click="refreshArticles">刷新</el-button>
        </div>
        <!-- <div class="hot-art-body clear-float" v-for="(hotArticle, i) in hotArticles" :key="i">
            <img class="body-image" v-if="hotArticle.artImageUrl !== ''" :src="hotArticle.artImageUrl" />
            update:3.16 图片显示
            <img class="body-image" v-if="hotArticle.parsedImageUrls.length > 0" :src="hotArticle.parsedImageUrls[0]"
                @error="onImageError">

            <span class="body-title" :class="[hotArticle.artImageUrl !== '' ? narrowTitle : wideTitle]"
                @click="jumpToArticle(hotArticle.artId)">
                {{ hotArticle.artTitle }}
            </span>
        </div> -->
        <!-- update:3.16 图片显示 -->
        <div class="hot-art-body clear-float" v-for="(hotArticle, i) in parsedHotArticles" :key="i">
            <img class="body-image" v-if="hotArticle.parsedImageUrls.length > 0" :src="hotArticle.parsedImageUrls[0]"
                @error="onImageError">
            <!-- FIX:4.6 -->
            <span class="body-title" :class="[hotArticle.parsedImageUrls.length > 0 ? narrowTitle : wideTitle]"
                @click="jumpToArticle(hotArticle.artTime, hotArticle.artId)">
                {{ hotArticle.artTitle }}
            </span>
        </div>
    </dark-card>
</template>

<script>
import DarkCard from "./DarkCard";

// update:3.16
export default {
    components: { DarkCard },
    props: ['title', 'hotArticles'],
    name: 'HotArticle',
    computed: {
        // update:3.16
        parsedHotArticles() {
            return this.hotArticles.map(hotArticle => {
                if (typeof hotArticle.artImageUrl === 'string' && hotArticle.artImageUrl.startsWith('[')) {
                    try {
                        const parsedImageUrls = JSON.parse(hotArticle.artImageUrl);
                        return {
                            ...hotArticle,
                            parsedImageUrls
                        };
                    } catch (error) {
                        window.console.error('Error parsing artImageUrl:', error);
                        return {
                            ...hotArticle,
                            parsedImageUrls: []
                        };
                    }
                }
                return {
                    ...hotArticle,
                    parsedImageUrls: hotArticle.artImageUrl ? [hotArticle.artImageUrl] : []
                };
            });
        }
    },
    methods: {
        jumpToArticle: function (artTime, artId) {
            this.$emit('jump', artTime, artId);
        },
        refreshArticles: function () {
            this.$emit('refresh');
        },
        // update:3.16
        onImageError(event) {
            // event.target.src = require('@/assets/logo.png');
            event.target.src = require('@/assets/image/text-image-logo.png')
        }
    },
    data: function () {
        return {
            narrowTitle: 'narrow-title',
            wideTitle: 'wide-title'

        }
    }
}
</script>

<style scoped>
.hot-art-header {
    border-bottom: solid 1px #ebeef5;
    margin-bottom: 15px;
}

.header-title {
    font-size: 20px;
    font-weight: 800;
    height: 40px;
    line-height: 40px;
    float: left;
}

/* 刷新按钮 */
.header-refresh {
    height: 40px;
    float: right;
}

/* 刷新 两个字 */
.header-refresh span {
    font-size: 16px;
    font-weight: 500;
}

.hot-art-body {
    margin-bottom: 10px;
}

.body-image {
    float: left;
    height: 50px;
    width: 27%;
    margin-right: 3%;
}

/* 新闻标题 */
.body-title {
    float: left;
    line-height: 25px;
    font-weight: 500;
    overflow: hidden;
    height: 50px;
    text-align: left;
}

.narrow-title {
    width: 70%;
}

.wide-title {
    width: 100%;
}

.body-title:hover {
    color: #339999;
    cursor: pointer;
}
</style>
