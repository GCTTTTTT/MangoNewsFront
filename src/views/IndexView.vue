<template>
    <div>
        <header>
            <top-bar class="top-bar" :customer="customer"></top-bar>
        </header>
        <main>
            <nav>
                <left-menu :curIndex="page.menuCurIndex" :majorLength="page.menuMajorLen" :tip="page.menuTip"
                    :artClassList="artTypes" v-on:changeCurIndex="changeCurIndex"></left-menu>
            </nav>
            <article>
                <tiny-article v-for="(tinyArticle, i) in tinyArticles" :key="i" :tinyArticle="tinyArticle"
                    v-on:jump="jumpToArticle" v-on:editor="jumpToCustomer"></tiny-article>
            </article>
            <aside>
                <!-- <edit-entrance class="edit-entrance"></edit-entrance> -->
                <DateSelector @dateSelected="handleDateSelected" />

                <hot-article :title="page.hotTitle" :hot-articles="hotArticles" v-on:refresh="refreshHot"
                    v-on:jump="jumpToArticle"></hot-article>
            </aside>
        </main>

        <!-- <div> -->
        <!-- <DateSelector @dateSelected="handleDateSelected" /> -->
        <!-- 这里展示数据 -->
        <!-- </div> -->
    </div>
    <!-- test -->

</template>

<script>
import TopBar from '../components/index/TopBar'
import LeftMenu from "../components/index/LeftMenu"
import TinyArticle from '../components/common/TinyArticle'
// import EditEntrance from "../components/common/EditEntrance";
import HotArticle from "../components/common/HotArticle";

// import Logo from '../assets/image/Logo.png'
import Logo from '../assets/image/text-image-logo.png'

import DateSelector from '@/components/common/DateSelect.vue'; // 假设日期选择器组件位于components文件夹下


import { getArtTypes, getHotArtOnePage, getTinyArtOnePageByType } from "../control/Load";
import { getCusBasicInfo } from "../control/Self";
// import { jumpInCurPage, jumpInNewPage } from "../util/PageJump";
import { jumpInCurPage } from "../util/PageJump";


export default {
    name: 'IndexView',
    components: {
        HotArticle,
        // EditEntrance,
        TinyArticle,
        TopBar,
        LeftMenu,
        DateSelector
    },

    mounted: function () {
        window.addEventListener('scroll', this.getMoreTinyArt, false);

        this.fetchData();

        // getCusBasicInfo(0)
        //     .then((response) => {
        //         if (response.data) {
        //             this.customer = response.data;
        //         } else {
        //             // this.$router.push({path: '/port'});
        //             jumpInCurPage('/port');
        //         }

        //     });
        // getArtTypes("2024-03-20")
        //     .then((response) => {
        //         // alert(response.data);
        //         this.artTypes = response.data;

        //     })
        //     .then(() => {
        //         getTinyArtOnePageByType("2024-03-20", '综合', this.page.tinyPage, this.page.tinyPageSize)
        //             .then((response) => {
        //                 // alert(response.data)
        //                 // 遍历对象数组，将每个对象转换为字符串并连接成一个长字符串
        //                 // let dataString = response.data.map(obj => JSON.stringify(obj)).join('\n');
        //                 // window.console.log(dataString);
        //                 // alert(dataString);

        //                 this.tinyArticles = response.data;
        //             });
        //         getHotArtOnePage("2024-03-20", this.page.hotPage, this.page.hotPageSize)
        //             .then((response) => {
        //                 this.hotArticles = response.data;
        //             });
        //     });
        // window.scrollTo(0, 0);
    },
    methods: {
        getYesterdayDate() {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 15);

            const year = yesterday.getFullYear();
            const month = String(yesterday.getMonth() + 1).padStart(2, '0');
            const day = String(yesterday.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        },

        handleDateSelected(selectedDate) {
            this.selectedDate = selectedDate;
        },
        fetchData() {
            getCusBasicInfo(0)
                .then((response) => {
                    if (response.data) {
                        this.customer = response.data;
                    } else {
                        // this.$router.push({path: '/port'});
                        jumpInCurPage('/port');
                    }
                });
            getArtTypes(this.selectedDate)
                .then((response) => {
                    this.artTypes = response.data;
                })
                .then(() => {
                    getTinyArtOnePageByType(this.selectedDate, '综合', this.page.tinyPage, this.page.tinyPageSize)
                        .then((response) => {
                            this.tinyArticles = response.data;
                        });
                    getHotArtOnePage(this.selectedDate, this.page.hotPage, this.page.hotPageSize)
                        .then((response) => {
                            this.hotArticles = response.data;
                        });
                });
            window.scrollTo(0, 0);
        },

        // handleDateSelected(selectedDate) {
        //     // 根据选择的日期获取数据
        //     window.console.log('Selected date:', selectedDate);

        //     alert(selectedDate);
        //     // 发送请求获取对应日期的数据
        // },
        /**
         * 如果选中的类别超过了 this.leftMenu.majorLength 的限制, 即属于二级类别,
         * 则调换 选中的类别 与 一级类别中最后一个类别 在数组中的位置.
         *
         * @param index 选中的类别下标
         */
        changeCurIndex: function (index) {
            if (index >= this.page.menuMajorLen) {
                this.page.menuCurIndex = this.page.menuMajorLen - 1;
                let median = this.artTypes[this.page.menuMajorLen - 1];
                this.artTypes[this.page.menuMajorLen - 1] = this.artTypes[index];
                this.artTypes[index] = median;
            } else {
                this.page.menuCurIndex = index;
            }

            this.page.tinyPage = 0;
            // getTinyArtOnePageByType("2024-03-20", this.artTypes[this.page.menuCurIndex], this.page.tinyPage, this.page.tinyPageSize)
            //     .then((response) => {
            //         this.tinyArticles = response.data;
            //     });
            getTinyArtOnePageByType(this.selectedDate, this.artTypes[this.page.menuCurIndex], this.page.tinyPage, this.page.tinyPageSize)
                .then((response) => {
                    this.tinyArticles = response.data;
                });

            window.scrollTo(0, 0);
        },

        /**
         * 刷新热点新闻
         */
        refreshHot: function () {
            if (this.page.hotPage > 3) {
                this.page.hotPage = 0;
            } else {
                this.page.hotPage += 1;
            }
            // getHotArtOnePage("2024-03-20", this.page.hotPage, this.page.hotPageSize)
            //     .then((response) => {
            //         this.hotArticles = response.data;
            //     })
            getHotArtOnePage(this.selectedDate, this.page.hotPage, this.page.hotPageSize)
                .then((response) => {
                    this.hotArticles = response.data;
                })
                .catch(() => {
                    this.$message.info("抱歉, 发生了点故障");
                });
        },

        // getMoreTinyArt: function () {
        getMoreTinyArt: () => {
            // alert("get more tiny art");

            let artHeight = document.getElementsByTagName('article')[0].offsetHeight;

            // alert("artHeight" + artHeight);
            let innerHeight = window.innerHeight;
            // alert("innerHeight" + innerHeight);
            // let otherHeight = 70 + 15;
            let otherHeight = 70;

            let scrollHeight = artHeight - innerHeight + otherHeight;
            // alert("scrollHeight" + scrollHeight);
            // alert(document.documentElement.scrollTop);
            // if ((document.documentElement.scrollTop) > 1024) { alert(document.documentElement.scrollTop); }

            if (scrollHeight <= (document.documentElement.scrollTop + 5)) {
                // alert("get more tiny art2");

                // alert(this.tinyPage)
                this.page.tinyPage += 1;
                // alert(this.page.tinyPage);
                // getTinyArtOnePageByType("2024-03-20", this.artTypes[this.page.menuCurIndex], this.page.tinyPage, this.page.tinyPageSize)
                //     .then((response) => {
                //         for (let i = 0; i < response.data.length; i++) {
                //             this.tinyArticles.push(response.data[i]);
                //         }
                //     })
                getTinyArtOnePageByType(this.selectedDate, this.artTypes[this.page.menuCurIndex], this.page.tinyPage, this.page.tinyPageSize)
                    .then((response) => {
                        // alert("get more tiny art3");
                        for (let i = 0; i < response.data.length; i++) {
                            this.tinyArticles.push(response.data[i]);
                        }
                    })
            }
        },

        /**
         * 跳转至文章页面
         * @param artId
         */
        jumpToArticle: function (artTime, artId) {
            // selectedDate = this.selectedDate
            // this.$router.push('/article/' + artId)
            // jumpInNewPage('/article/' + artId);
            jumpInCurPage('/article/' + artTime + '/' + artId);

        },

        /**
         * 跳转至作者用户页面
         * @param cusId
         */
        jumpToCustomer: function (cusId) {
            // this.$router.push('/self/' + cusId);
            // jumpInNewPage('/self/' + cusId);
            jumpInCurPage('/self/' + cusId);

        }
    },
    watch: {
        selectedDate() {
            this.fetchData();
        }
    },
    data: function () {
        return {
            // todo:这里莫不是默认日期？！
            // selectedDate: '2024-03-20',
            selectedDate: this.getYesterdayDate(),


            // 记录页面控制信息
            page: {
                menuCurIndex: 0,
                menuMajorLen: 8,
                menuTip: '更多',
                tinyPage: 0,
                tinyPageSize: 50,
                hotTitle: '新闻推荐',
                hotPage: 0,
                hotPageSize: 6
            },
            artTypes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
            tinyArticles: [
                {
                    artId: 1, artTitle: "即将开启降温模式",
                    artAbstract: "降温降雨天气预报预计今晚到明天我州东北部地区阴天普遍有小雨，高山有雨夹雪和大雾，日平均气温下降4～6℃；州西南部晴转多云，局地间有阴天和零星小雨，气温下降2～4℃。请注意相关防御措施。未来24小时内，各县最低气温1℃～10℃，最高气温10～22℃。",
                    artTime: "2019-11-25T08:35:55.000+0000",
                    artImage: "http://p1.pstatp.com/large/pgc-image/Reyxsbp6He2NU3",
                    customer: {
                        cusName: "光明网",
                    }
                },
                {
                    artId: 2, artTitle: "即将开启升温模式",
                    artAbstract: "降温降雨天气预报预计今晚到明天我州东北部地区阴天普遍有小雨，高山有雨夹雪和大雾，日平均气温下降4～6℃；州西南部晴转多云，局地间有阴天和零星小雨，气温下降2～4℃。请注意相关防御措施。未来24小时内，各县最低气温1℃～10℃，最高气温10～22℃。",
                    artTime: "2019-11-25T08:35:55.000+0000",
                    artImage: "",
                    customer: {
                        cusName: "光明网",
                    }
                },
            ],
            hotArticles: [
                { artId: '1', artTitle: 'This is the template title of news', artImageUrl: Logo },
                { artId: '2', artTitle: 'This is the template title of news', artImageUrl: '' },
                { artId: '3', artTitle: 'This is the template title of news', artImageUrl: '' },
                { artId: '4', artTitle: 'This is the template title of news', artImageUrl: Logo },
                { artId: '5', artTitle: 'This is the template title of news', artImageUrl: Logo },
                { artId: '6', artTitle: 'This is the template title of news', artImageUrl: Logo },
            ],
            customer: {

            }
        }
    }
}
</script>


<style scoped src="../assets/css/Normal.css"></style>
<style scoped>
/*.bottom-tip {*/
/*    color: #888888;*/
/*}*/
.edit-entrance {
    margin-bottom: 10px;
}

/* .el-input--prefix .el-input__inner {
    padding-left: 30px;
    width: 140px;
} */
</style>