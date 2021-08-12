
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

    ### 好友 ###
    following: [uid]
    followedBy: [uid]

    ### 论坛 ###
    posts: [postDocId]// string[]
    postNum: int
    comment: [uid]
    postLike: [postDocId]
    followPost: [postDocId]
    savedpost: Map<string,string[]>

    ### 二手 ###
    wantToBuy: [productBuy]// 求购车

    cart: [productSell]//购物车
    boughtNum: int // 购买个数
    bought:[productBuy] // 已购买物件

    wantToSell: [productSell] // 售卖栏
    soldNum: int // 已售卖个数
    sell:[productSell] // 已售卖物件

    willingToBuy: [productWillBuy]// 求购(this going to have another collection)
    order: [orderDocId]

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
    description: string
    picture: reference_pic
    video: reference_vid(nullable)
    dealPrice: float
    category: [reference_cat]
    location: geopoint
    returnable: bool
    archieve: bool

    ### track owner/posting info ###
    postTime: time
    postBy: refernce_user

    ### Following are nullable ###
    auction: bool
    auctionStartPrice(起拍价): float
    auctionIncrementPrice(最小增加单位): float
    auctionStartTime: time
    auctionEndTime: time

    ### Comment ###
    reply: [reference_reply]
}
```
```
buy {
    description: string
    picture: reference_pic (nullable)
    targetPrice: float (nullable)
    category: [reference_cat]
    location: geopoint
    archieve: bool

    ### track owner/posting info ###
    postTime: time
    postBy: refernce_user

    ### Comment ###
    reply: [reference_reply]
}
```

```
order {
    seller: refernce_user
    buyer: refernce_user
    orderType: bool
    obj: refernce_sell or refernce_buy 
    time: time
    price: float

    ### 预留 ###
    paid: bool
    cancelled: bool
    returnable: bool
    transcation: None
    delivery: None
    satisfaction: int (1 to 5)
}
```

## 论坛

```
post: {
    ### Post Info ###
    poster: reference_user
    createTime:Time

    ### content ###
    content: reference_str(md)
    pictures:[reference_picture]
    replies: [reference_reply]
    replyNum: int
    type: "multi photos"/ "single photo" / "No photo"
    postCategory: [reference_cat] (default cat: nothing)

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

