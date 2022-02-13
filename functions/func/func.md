- addNewFolder 建立新的收藏夹
    input:
        uid:string,
        newAddedName:string,
    output:
        Promise with error or resolve

- deleteFolderFunc 删除指定收藏夹
    input:
        uid: string;
        folderName: string;
    ouput:
        Promise with error or resolve

- readMultipleHotPosts 按顺序打印多个数据库中的post 每次输出十个
    input: 
        prePostId: 第一次调用此函数时postId 为 null，postid为上次调用中最后一个帖子的 。
    Output：
        postArray: limit 10 posts max for each call 每次打印10个post

- readMultipleRandomPosts 功能同上但是随机打印
    input: 
        prePostId: 第一次调用此函数时postId 为 null，postid为上次调用中最后一个帖子的 。
    Output：
        postArray: limit 10 posts max for each call 每次打印10个post

- getAllTags 获取所有的tag
    input:
        无
    output:
        all tag docs

- getPostsByTag
    input:
        PrePostid: 第一次调用此函数时postId 为 null，postid为上次调用中最后一个帖子的 
        TagName: string
    output:
        PostArray: limited 10 posts max for each call

- getTagsByUid 获取用户 storeArray 中的标签并返回相应的数据
    Inputs 
        uid: string
    Outputs 
        array of tag docs

- removeSavedTag 删除保存的 tag
    input:
        uid: string,
        tagName: string,
    output:
        Promise<FirebaseFirestore.WriteResult>

- saveTag 保存tag
    Input 
        uid: user Id of the current user
        tagName: the name of the tag user wanted to save
    Output
        Proimise

- addComment 添加评论
    input:
        author: the userId of user who composed the comment
        content: the content of the comment
        replyToPost: indicates whether the comment is replying to a post/comment
        replyId: the id of the post/comment that this comment is replying to.
    output:
        the comment should be added into the comment collection

- addLikeComment 点赞评论 
    input:
        uid: uid of the update user
        commentId: the comment user want add like to
    output:
        promise

- addLikePost 点赞post
    input:
        uid: uid of the update user
        postId: the post user want add like to
    output:
        promise

- deleteComment 删除评论
    input:
        commentId: string;
    output:
        promise<writeresult>

- getComment 更具comment id 读取 评论 
    input:
        commentId: the ID of tag
    output:
        the comment doc

- getDirectComment 获取post下的评论
    input:
        postId: the postId of the post you wanna find
        limit: the number of how many (maximum) comments you wanna get. (limit == 0 if there is no limitation)
    output:
        comments Data

- getSavedPosts 读取保存的post
    input:
        uid: the user id of the current user
        folderName: the name of the folder you wanna find
    output:
        save folder Data

- getSubComment 获取这个评论下的评论
    input:
        commentId: the Comment Id of the parent comment
    output:
        child comment data

- removeLikeComment 取消对这个评论的点赞
    input:
        uid: uid of the update user
        commentId: the comment user want remove like to
    output:
        promise

- removeLikePost 取消对这个 post的点赞
    input:
        uid: uid of the update user
        postId: the post user want remove like to
    output:
        promise

- removeSavedPost 从收藏夹里取消对post 的收藏
    input:
        uid: string;
        folderName: string;
        postId: string;
    output:
        promise

- savePost 收藏post
    input:
        uid: user Id
        folderName: the name of the folder user saved post to
        postId: post Id of the post user saved
    output:
        promise

- updateRepliedComment 更新回复评论的评论
    input:
        commentId: the id of the parent comment being updated,
        toAddId: the id of the child comment to be tracked
    output:
        the child comment id should be added into the parent comment's repliedBy array

- updateRepliedPost 更新回复post 的评论
    input:
        postId: the id of the parent post being updated,
        toAddId: the id of the child comment to be tracked
    output:
        the child comment id should be added into the parent post's repliedBy array

- updateRepliedProductBuy  更新回复在求购产品下的评论
    input:
        productId: string,
        toAddId: string,
    output:
        the child comment id should be added into the parent post's repliedBy array

- updateRepliedProductSell 更新回复在售卖产品下的评论
    input:
        productId: string,
        toAddId: string,
    output:
        the child comment id should be added into the parent post's repliedBy array

- getHotTagsInOneDay 获取当日最火的20 个 tag
    input:
        none
    output:
        the array of 20 hotest tags within 1 day, highest score to lowest score

- getHotTagsInOneMonth 获取一个月内最火的20个 tag
    input:
        none
    output:
        the array of 20 hotest tags within 1 month, highest score to lowest score

- getHotTagsInOneWeek 获取一个周内最火的20 个tag
    input:
        none
    output:
        the array of 20 hotest tags within 1 month, highest score to lowest score

- getPostScore 获取当前post 的 分数
    input:
        postId: the postId of the post you want to get score of
    output:
        return the actual score of the post (does not include upload)

- getTagScore 获取当前tag的分数
    input:
        tagId: The tagId of the tag which you want to check
    output:
        return the actual score of the tag (does not include upload)

- getTenHotTags 获取最火的10个tag
    input:
        none
    output:
        the array of 10 hotest tags within 7 days, highest score to lowest score

- updatePostScore 更新post 的 分数
    input:
        postId : the id of a post needed to be update
    output:
        promise<writeresult>

- updateTagScore 更新tag 的分数
    input:
        tagId: the id of the tag you want to update
    output:
        promise<writeresult>

- createOrder 创建订单
    input:
        sellerUid: string, // 
        buyerUid: string, // 
        price: number,
        orderType: boolean; // 0 for buy 1 for sell
        product: string;//
    output:
        promise

- deleteOrder 删除订单（这并不会删除，只会显示订单取消，stage 为 0）
    input:
        uid: string;
        orderId: string;
    output:
        updateorder with change stage to 0

- readOrder 读取订单信息
    input:
        orderId: string; 
    output:
        promise<firebasefirestore.documentdata | undefined>

- updateOrderStage 更新订单阶段
    input:
        orderId: string; 
    output:
        promise<firebasefirestore.documentdata | undefined>

- createProdBuy 创建求购商品
    input:
        uid: string,
        productName: string,
        targetPrice: number,
        description: string,
        image: string[] | never[];
        location: any;
    output:
        promise

- deleteProdBuy 删除求购商品
    input:
        uid: string;
        prodId: string;
    output:
        promise

- readMultipleRandomBuy 获取多个随机的求购商品显示 一次获取20 个 
    input:
        prebuyId: the postId of the last post in previous call null for first time calling this func.
    output:
        prodArray: limit 20 posts max for each call

- readProdBuy 读取求购商品信息
    input:
        prodId: string;
    output:
        promise<firebasefirestore.documentdata | undefined>

- updateProdBuy 更新求购商品信息
    input:
        uid: string;
        prodId: string;
        updateField: string;
        updateContext: any;
    output:
        promise<writeresult>

- createSellProduct 创建二手物品信息
    input:
        uid: string,
        productName: string,
        price: number,
        description: string,
        status: number;
        image: string[] | never[];
        location: any;
        auction: boolean;
        doneDeal: number;
    output:
        promise

- deleteSellProduct 删除售卖物品信息
    input:
        uid: string;
        prodId: string;
        updateField: string;
        updateContext: any;
    output:
        promise<writeresult>

- readMultipleRandomSell 获取20 个随机的二手售卖物品
    input:
        preSellId: the postId of the last post in previous call null for first time calling this func.
    output:
        prodArray: limit 20 posts max for each call

- readSellProduct 读取二手售卖物品信息
    input:
        prodId: string;
    output:
        promise<firebasefirestore.documentdata | undefined>
 
- updateSellProduct 更新售卖物品信息
    input:
        uid: string;
        prodId: string;
        updateField: string;
        updateContext: any;
    output:
        promise<writeresult>

- searchPosts 搜索post 方程
    input:
        input: the user input
        prePostId: the postId of the last post in previous call
        empty for first time calling this func.
        title: search title (true) search content (false)
    output:
        postData array

- searchProducts 搜索产品方程
    input:
        input: the user input
        preProductId: the productId of the last product in previous call
        empty for first time calling this func.
        buy : true for 'productBuy' false for 'productSell'
    output:
        productData array

- searchTag 搜索tag 方程
    input:
        input: tag Name you wanna find
        preTagId: the tagId of the last tag in previous call empty for first time calling this func.
    output:
        tagData: the array of tags matched with the key word

- searchUser  搜索用户方程
    input:
        input: user Name you wanna get
        preUid: uid of the last user in preivous call of this func
    output:
        userData: the array of user data that matched with the input, limit 10