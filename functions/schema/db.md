
```
## user
user {
    ### profile ###
    userName:(this is unique) default by uid
    email: string
    phoneNumber: number; // 电话号码
  	location: string; // 位置
    RegisterDate: timestamp
    rate: Number // 用户信誉积分
    avatar: url(string)
    gender: 0/ 1/ -1

    ### 好友 ###
    following: [uid]
    followedBy: [uid]

    ### 论坛 ###
    posts: [postDocId]// string[] 自己创建的评论
    postNum: int // 评论数
    comment: [string] // 写的评论
    postLike: [postDocId] // 喜欢的动态
    followPost: [postDocId] // 这个好像有点问题 
    savedPost: string[] // 收藏的动态

    ### 二手 ###
    wantToBuy: [productBuy]// 求购车

    cart: [productSell]//购物车
    boughtNum: int // 购买个数
    bought:[productBuy] // 已购买物件

    wantToSell: [productSell] // 售卖栏
    soldNum: int // 已售卖个数
    sell:[productSell] // 已售卖物件

    willingToBuy: [productWillBuy]// 求购(this going to have another collection)
    order: [orderDocId] // 订单信息

		### 身份验证 ###
    student: boolen // default: 0, 1 已认证
    realName: boolen // default: 0, 1 已认证
    school: string // default empty, when setudent == 1 fill in school Name

}

## School{

}
```
## 闲置交易

```
sell {
    uid: string// 卖家信息 -- reference 
    emailVerify: boolean // 邮箱认证
    phoneVerify: boolean //手机号码验证
    createTime: number // 创建时间
    Name: string, // 商品名字
    description: string // 商品阐述
    status: string, // 商品新旧状态
    picture: image url[] // 图片 数组
    video: video url[] // 视频数组
    dealPrice: float  一口价 / if 有 拍卖 那就显示 当前价格
    category: string // 商品种类
    location: geopoint //
    returnable: bool // 
    archieve: bool // 这个值用来判定是否显示在主页

    ### track owner/posting info ###
    postTime: time
    postBy: refernce_user

    ### Following are nullable ###
    auction: bool // 拍卖：1 or 0 是否开启拍卖模式
    auctionStartPrice(起拍价): float
    auctionIncrementPrice(最小增加单位): number
    auctionStartTime: time 拍卖开始时间
    auctionEndTime: time  拍卖结束时间（默认7天

    ### Comment ###
    reply: String
}
```
```
buy {
    name: string, // 物品名字
    uid: string, // 发布人信息
    description: string // 物品描述
    picture: string[] (nullable) // 图片数组
    targetPrice: float (nullable) // 求购心理预期
    category: [reference_cat] // 物品种类
    location: geopoint // 地点
    archieve: bool // 是否显示在主页
    createTime: time // 发部时间

    ### Comment ###
    reply: [string] // 回复
}
```

```
order {
    seller: String // 卖家id
    buyer: String // 买家id
    orderType: bool // sell or buy
    obj: String // docid from product 
    time: time // 购买时间
    price: float // 购买时的价格

    ### 预留 ###
    paid: bool // 是否付钱
    cancelled: bool // 是否取消
    returnable: bool //
    transcation: None
    delivery: nool // 是否寄送 或者 是否交易
    // 评分系统
    rateToBuyer: int (1 to 5) 
    rateToSeller: int (1 to 5)
}
```

## 论坛

```
post: {
    ### Post Info ###
    uid: userid
    createTime:Time

    ### content ###
    title: string // 题目
    content: string // 内容
    image:[image url]
    comment: [comment id]
    commentNum: int
    tag: string // hashtag 分类
    category: [大分类] (default cat: 其他)

    #### like feature ####
    like: int
    likeBy:[reference_user]

    ### share ###
    shareNum: int
    shareBy: [reference_user]

    ### viewed ###
    viewNum: int

    ### saved ###
    savedNum: int
    savedBy: [reference_user]

    ### edit ###
    edited: bool
    editTime: time
    
    postScore: number // 热力分
    aStatus: bool // 是否匿名
}

reply{ // this is nested 
    ### reply Info ###
    replyBy: reference_user
    replyTo: reference_post / reference_reply(R2R,R2P,R2N)

    ### content ###
    content: reference_str(md)
    createTime: Time
    picture:[refrence_picture]
    type: "multi photos"/ "single photo" / "No photo"

    #### like feature ###
    like: int
    likeBy: [reference_user]
}
```

```
pictures{
    uploadBy:reference_user
    url: string
    Time: time
}
```

```
videos{
    uploadBy: reference_user
    url: string
    Time: time
}
```

```
news{// 官方公告
    ### Post Info ###
    poster: reference_user
    createTime:Time

    ### content ###
    content: reference_str(md)
    pictures:[reference_picture]
    replies: [reference_reply]
    replyNum: int
    type: "multi photos"/ "single photo" / "No photo"
    NewsCategory: [reference_cat] (default cat: nothing)

    #### like feature ####
    like: int
    likeBy:[reference_user]

    ### share ###
    shareNum: int
    shareBy: [reference_user]

    ### viewed ###
    viewNum: int

    ### saved ###
    savedNum: int
    savedBy: [reference_user]
}
```

```
category{
    catName: string
    catNum: int
    catType: 论坛 or 商品 or news
}
```

