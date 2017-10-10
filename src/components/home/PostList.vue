<template>
  <div class="PostList">
    <div class="loading" v-if="loading">Loading......</div>
    <div class="posts" v-else>
		<ul>
			<li v-for="(post, index) in posts">
				<router-link :to="{ name: 'user_info', params: { name: post.author.loginname }}" :title="post.author_id">
					<img :src="post.author.avatar_url" :title="post.author.loginname">
				</router-link>
				<span>{{ post.reply_count }}/{{ post.visit_count }}</span>
				<router-link :to="{ name: 'post_content', params: { id:post.id, name:post.author.loginname } }" :title="post.title">{{ post.title }}</router-link>
				<span class="last_reply">
					{{ post.last_reply_at | formatDate }}
				</span>
			</li>
		</ul>
    </div>
  </div>
</template>

<script>
export default {
  	name: 'PostList',
  	data () {
	    return {
	    	loading: false,
	    	posts: {}
	    }
  	},
  	filters: {
  		timeStyle(createTime){
  			return String(createTime).match(/.{10}/)[0];
  		}
  	},
  	methods: {
  		getData(){
  			this.$http({
  				url: 'https://cnodejs.org/api/v1/topics',
  				methods: 'get',
  				params: {
  					page: 1,
  					limit: 10
  				}
  			})
  			.then((response) => {
  				response = response.data;
  				if( response.success === true ) {
  					this.posts = response.data;
  					this.loading = false;
  					// console.log(JSON.stringify(this.posts));
  				}
  			})
  			.catch(function (error){
  				console.log(error);
  			});
  		}
  	},
  	beforeMount() {
  		this.loading = true;
  		this.getData();
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.PostList {
	.posts {
		background-color: white;
		padding: 0.5rem;
		margin: 0.5rem 3rem;
		li {
			list-style: none;
			margin-bottom: 14px;
			border-bottom: 1px solid #E7E7E7;
			line-height: 30px;
			img {
				width: 1.5rem;
				height: 1.5rem;
			}
			span {
				display: inline-block;
				text-align: center;
				width: 70px;
				font-size: 12px;
				margin: 0 10px;
			}
		}
		a {
			text-decoration: none;
			color: inherit;
		    -o-text-overflow: ellipsis;
		    white-space: nowrap;
		    display: inline-block;
		    vertical-align: middle;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    max-width: 70%;
		    &:visited {
				color:#858585;
			}
		}
		.last_reply {
			float: right;
	   		font-size: 0.7rem;
	   	    margin-top: 0.3rem;
		}
	}
}


</style>
