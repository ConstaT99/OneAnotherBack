
```
user {
    blahb
}
userInfo {
    uid: reference

    ### profile ###
    RegisterDate: Time

    message: [strings] // 私信通知

    ### 好友 ###
    following: [reference_uid]
    followedBy: [reference_uid]

    ### 论坛 ###
    posts: [reference_posts]
    postNum: int
    replies: [reference_reply]
    replyNum: int
    postLike: [reference_post]
    followPost: [reference_post]

    ### 二手 ###
    starred: [reference_Product] #收藏栏
    wantToBuy: [Sell]
    buyingNum: int // 正在求购

    wantToSell: [Buy]
    sellingNum: int // 正在销售

    soldNum: int
    buyNum: int

    ### 预留 ###
    prefrence: None #浏览记录etc.
    payment: None
    mailing: None
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
    picid: autoid
    url: string
    Time: time
}
```

```
videos{
    uploadBy: reference_user
    vidid:autodi
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

