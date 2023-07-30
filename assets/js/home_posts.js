{
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(), // serialize converts form data into json format
                success : function(data){
                    let newPost = newPostDom(data.data.post);
                    $(`#posts-list-container>ul`).prepend(newPost);
                },
                error : function(err){
                    console.log(err.responseText);
                }
            });
            }
        );
    }

    //
    let newPostDom = function(post){
        return $(`<li id="post-${ post._id}">
        <p>
           
                <small>
                    <a class="delete-post-button"  href="/posts/destroy/${ post.id }">X</a>
                </small>
           
                ${ post.content }
            <br>
            <small>
            ${ post.user}
            </small>
        </p>
        <div class= "post-comments">
           
                <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="Type here to add comment...." required>
                    <input type="hidden" name="post" value="<%=post._id%>">
                    <input type="submit" value="Add Comment">
                </form>
           
            <div class = "post-comments-list">
                <ul id = "post-comments-${post._id}">
                </ul>
            </div>
        </div>
    </li>`);
    }

    createPost();
}