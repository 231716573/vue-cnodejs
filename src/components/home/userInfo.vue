<template>
	<div class="userInfo">
		<div class="loading" v-if="loading">
			Loading...
		</div>
		<div class="userInfomation" v-else>
			<section>
				<img :src="userinfo.avatar_url" :title="userinfo.loginname">
				<span>{{ userinfo.loginname }}</span>
				<p>{{ userinfo.score }}积分</p>
				<p>注册时间：{{ userinfo.create_at | formatDate }}</p>
			</section>
			<div class="replies">
				<p>回复的主题</p>
				<ul>
					<li v-for="(item, index) in userinfo.recent_replies">
						<router-link :to="{ name: 'post_content', params: {id: item.id, name:item.author.loginname} }" :title="item.title">
							{{ item.title }}
						</router-link>
					</li>
				</ul>
			</div>
			<div class="topics">
				<p>创建的主题</p>
				<ul>
					<li v-for="(item, index) in userinfo.recent_topics">
						<router-link :to="{ name: 'post_content', params: {id: item.id, name:item.author.loginname} }" :title="item.title">
							{{ item.title }}
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  	name: 'userInfo',
  	data () {
	    return {
	    	userinfo: {},
	      	loading: false
	    }
  	},
  	methods: {
  		getData() {
  			this.$http({
  				url: `https://cnodejs.org/api/v1/user/${this.$route.params.name}`,
  				methods: 'get'
  			})
  			.then((response) => {
  				response = response.data;
  				if(response.success === true){	
	  				this.userinfo = response.data;
  				}
  				this.loading = false;
  			})	
  			.catch((error) => {
  				console.log(error);
  			})
  		}
  	},
  	beforeMount() {
  		this.loading = true;
  		this.getData();
  		console.log(this.$route.params.name);
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.userInfomation {
	background: white;
	width: 75%;
	margin:10 auto;
	section {
		padding: 12px;
	}
	img {
		width: 5rem;
	}
	li {
		list-style: none;
	}
	.replies, .topics {
		font-size: 0.72rem;
		border-top: 10px #DDD solid;
	}
	> div > p {
		padding: 12px 0 12px 12px;
		background-color: rgba(212, 205, 205, 0.17);
  		font-size: 0.75rem;		
	}
	> div > ul > li {
		padding: 4px 0 4px 12px;
		white-space: nowrap;
	    font-size: 0.72rem;
		text-overflow: ellipsis;
		overflow: hidden;
	    line-height: 30px;
        vertical-align: middle;	
        > a {
        	color: #094E99;
			text-decoration: none;
        }
	}
}
</style>
