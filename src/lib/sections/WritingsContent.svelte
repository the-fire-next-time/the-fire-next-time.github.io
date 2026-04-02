<script>
	const articles = [
		{
			title: 'HK Fire Disaster A Tragedy on Many Levels',
			date: '12/03/2025',
			url: 'https://asiatimes.com/2025/12/hk-fire-disaster-a-tragedy-on-many-levels/',
			summary:
				'Wang Fuk Court’s deadly conflagration has shown just how much the city’s freedoms have been extinguished.'
		},
		{
			title: 'Survivors Call, but No One Answers',
			date: '10/19/2025',
			url: 'https://thevarsity.ca/2025/10/19/survivors-call-but-no-one-answers/',
			summary: 'A university that ignores survivors’ calls silences their voices.'
		},
		{
			title: 'Taiwan Is My Favourite: K-pop Fans in The Bluebird Movement',
			date: '05/02/2025',
			url: 'https://taiwaninsight.org/2025/05/02/taiwan-is-my-favourite-k-pop-fans-in-the-bluebird-movement/',
			summary: '‘One core of fan culture is identity.’'
		},
		{
			title: '認識性別流動與非二元：我可以不男不女或既男又女嗎？',
			date: '07/13/2025',
			url: 'https://www.queermargins.tw/genderfluid-nonbinary-lorraine-pan',
			summary:
				'對一些人來說，指定性別與性別認同是幾乎完全重合的；對一些人來說，指定性別與性別認同之間存在一條涇渭分明的界線，惟有跨越才能尋回自我。對我來說，指定性別與性別認同兩者，都是在不斷延伸與變化的空間——這兩個空間會碰撞、會衝突，也會交疊。'
		},
		{
			title: '給哈佛蔣雨融的公開信：你口中的悲劇，正發生在你為之驕傲的土地上',
			date: '07/05/2025',
			url: 'https://www.thenewslens.com/article/253924',
			summary:
				'我也出生在中國，我也對自己的故土有著深刻的情感。然而，作為一名異見者，我卻永遠無法再回到自己的家鄉。普通話不是我的母語，這個政權所推動的單一語言教育剝奪了我用母語表達的權利。當我離開故土，為自己、為他人發出聲音時，卻收到在中國的家人受到警察騷擾的消息──你也會為這些感到苦痛嗎？'
		}
	];
</script>

<div class="prose">
	<p>
		I focus on decentralised social movements and activism organising in East Asian communities for
		human rights and democracy, especially from those who are underrepresented, including labour,
		(im)migrants, people with disabilities, trans and queer people, and dissident diasporas building
		communities overseas outside East Asia.
	</p>

	<p>
		I also tell stories about queer communities, especially shared identities, collective action,
		and transnational solidarity within East Asian women and queer people, resisting patriarchal
		oppression along with resisting racism, colonialism, and xenophobia.
	</p>

	<h3>Selected Works</h3>
	<ul>
		{#each articles as article (article.title)}
			<li>
				<span
					><a href={article.url} rel="external" target="_blank">{article.title}</a> - {article.date}</span
				>
				<p class="text-stone-500">{article.summary}</p>
			</li>
		{/each}
	</ul>
</div>
