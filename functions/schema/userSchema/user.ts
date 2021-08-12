import { UserRecord } from 'firebase-functions/lib/providers/auth';
import * as admin from 'firebase-admin';

export default class User {
  uid:string;

  userName: string | undefined;

  phoneNumber: string | undefined;

  location: string | undefined;

  registerDate: admin.firestore.Timestamp ;

  email: string | undefined;

  rate: number;

  avatar: string | undefined;

  gender: number;

  postLike: string[];

  post: string[];

  postNum: number;

  comment: string[];

  followPost: string[];

  savedPost:string[];

  followBy: string[];

  followingList:string[];

  wantToSell:string[];

  sold: string[];

  soldNum:number;

  bought: string[];

  boughtNum: number;

  cart: string[];

  wantToBuy: string[];

  order: string[];

  student: boolean;

  realName: boolean;

  school: string;

  blackUserList: string[];

  blackPostList: string[];

  constructor(data: UserRecord) {
    const {
      uid, photoURL, email, phoneNumber, displayName,
    } = data;
    this.uid = String(uid);
    this.avatar = String(photoURL);// avatar url
    this.location = '';
    this.gender = 0;// 0 means unkwnon, 1 means female , 2 means male
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.userName = displayName;
    // profile
    this.userName = String(data?.displayName); // given a default
    this.registerDate = admin.firestore.Timestamp.now(); // get current date
    this.rate = 5; // 用户信誉分
    // post
    this.postLike = []; //  喜欢的帖子 post/docId
    this.post = []; // 发的帖子
    this.postNum = 0; // 发帖个数
    this.comment = []; // 评论 comment/docId
    this.followPost = []; // 关注的post post/docId
    this.savedPost = [];
    // friend
    this.followBy = [];// 关注我的用户 user/docId
    this.followingList = []; // 关注的其他用户 user/docId

    // resell
    this.wantToSell = [];// 售卖栏
    this.sold = [];// 卖掉物品列表 producsell/docId
    this.soldNum = 0;// 卖掉物品个数

    this.bought = [];// 购买的物品 productBuy/docId
    this.boughtNum = 0; // 购买物品个数
    this.cart = [];// 购物车
    this.wantToBuy = [];// 求购

    this.order = []; // 订单列表 order/docId
    // 验证
    this.student = false; // by default the student status will unverify which is 0;
    this.realName = false; // by default the real status will unverify which is 0;
    this.school = ''; // if student is 1 this school will fill in the name of school;

    // 黑名单
    this.blackUserList = [];
    this.blackPostList = [];
  }
}
