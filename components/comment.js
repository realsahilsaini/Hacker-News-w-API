export default function Comment(comment){

    return `
    <div class="nested-comments-0">
        <p class="comment-header">
        ${comment.user} | ${comment.time_ago}
        </p>
        ${comment.content}
    </div>
    `
}