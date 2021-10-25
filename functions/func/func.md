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

- saveTag
    Input 
        uid: user Id of the current user
        tagName: the name of the tag user wanted to save
    Output
        Proimise

- addComment
    input:
        author: the userId of user who composed the comment
        content: the content of the comment
        replyToPost: indicates whether the comment is replying to a post/comment
        replyId: the id of the post/comment that this comment is replying to.
    output:
        the comment should be added into the comment collection

- addLikeComment
    input:
        uid: uid of the update user
        commentId: the comment user want add like to
    output:
        promise

- addLikePost
    input:
        uid: uid of the update user
        postId: the post user want add like to
    output:
        promise

- deleteComment
    input:
        commentId: string;
    output:
        promise<writeresult>

- getComment
    input:
        commentId: the ID of tag
    output:
        the comment doc

- getDirectComment
    input:
        postId: the postId of the post you wanna find
        limit: the number of how many (maximum) comments you wanna get. (limit == 0 if there is no limitation)
    output:
        comments Data

- getSavedPosts
    input:
        uid: the user id of the current user
        folderName: the name of the folder you wanna find
    output:
        save folder Data

- getSubComment
    input:
        commentId: the Comment Id of the parent comment
    output:
        child comment data

- removeLikeComment
    input:
        uid: uid of the update user
        commentId: the comment user want remove like to
    output:
        promise

- removeLikePost
    input:
        uid: uid of the update user
        postId: the post user want remove like to
    output:
        promise

- removeSavedPost
    input:
        uid: string;
        folderName: string;
        postId: string;
    output:
        promise

- savePost
    input:
        uid: user Id
        folderName: the name of the folder user saved post to
        postId: post Id of the post user saved
    output:
        promise

- updateRepliedComment
    input:
        commentId: the id of the parent comment being updated,
        toAddId: the id of the child comment to be tracked
    output:
        the child comment id should be added into the parent comment's repliedBy array

- updateRepliedPost
    input:
        postId: the id of the parent post being updated,
        toAddId: the id of the child comment to be tracked
    output:
        the child comment id should be added into the parent post's repliedBy array

- updateRepliedProductBuy
    input:
        productId: string,
        toAddId: string,
    output:
        the child comment id should be added into the parent post's repliedBy array

- updateRepliedProductSell
    input:
        productId: string,
        toAddId: string,
    output:
        the child comment id should be added into the parent post's repliedBy array

- getHotTagsInOneDay
    input:
        none
    output:
        the array of 20 hotest tags within 1 day, highest score to lowest score

- getHotTagsInOneMonth
    input:
        none
    output:
        the array of 20 hotest tags within 1 month, highest score to lowest score

- getHotTagsInOneWeek
    input:
        none
    output:
        the array of 20 hotest tags within 1 month, highest score to lowest score

- getPostScore
    input:
        postId: the postId of the post you want to get score of
    output:
        return the actual score of the post (does not include upload)

- getTagScore
    input:
        tagId: The tagId of the tag which you want to check
    output:
        return the actual score of the tag (does not include upload)

- getTenHotTags
    input:
        none
    output:
        the array of 10 hotest tags within 7 days, highest score to lowest score

- updatePostScore
    input:
        postId : the id of a post needed to be update
    output:
        promise<writeresult>

- updateTagScore
    input:
        tagId: the id of the tag you want to update
    output:
        promise<writeresult>

- createOrder
    input:
        sellerUid: string, // 
        buyerUid: string, // 
        price: number,
        orderType: boolean; // 0 for buy 1 for sell
        product: string;//
    output:
        promise

- deleteOrder
    input:
        uid: string;
        orderId: string;
    output:
        updateorder with change stage to 0

- readOrder
    input:
        orderId: string; 
    output:
        promise<firebasefirestore.documentdata | undefined>

- updateOrderStage
    input:
        orderId: string; 
    output:
        promise<firebasefirestore.documentdata | undefined>

- createProdBuy
    input:
        uid: string,
        productName: string,
        targetPrice: number,
        description: string,
        image: string[] | never[];
        location: any;
    output:
        promise

- deleteProdBuy
    input:
        uid: string;
        prodId: string;
    output:
        promise

- readMultipleRandomBuy
    input:
        prebuyId: the postId of the last post in previous call null for first time calling this func.
    output:
        prodArray: limit 20 posts max for each call

- readProdBuy
    input:
        prodId: string;
    output:
        promise<firebasefirestore.documentdata | undefined>

- updateProdBuy
    input:
        uid: string;
        prodId: string;
        updateField: string;
        updateContext: any;
    output:
        promise<writeresult>

- createSellProduct
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

- deleteSellProduct
    input:
        uid: string;
        prodId: string;
        updateField: string;
        updateContext: any;
    output:
        promise<writeresult>

- readMultipleRandomSell
    input:
        preSellId: the postId of the last post in previous call null for first time calling this func.
    output:
        prodArray: limit 20 posts max for each call

- readSellProduct
    input:
        prodId: string;
    output:
        promise<firebasefirestore.documentdata | undefined>

- updateSellProduct
    input:
        uid: string;
        prodId: string;
        updateField: string;
        updateContext: any;
    output:
        promise<writeresult>
