<template>
	<div class="scan">
		<button @click='startRecognize'>摄像头</button>
		<button @click='openphoto'>图片扫描</button>
		<button @click="cancelScan"
			style="position: fixed; right: 20px; top: 20px; z-index: 99999;">取消</button>
		<div id="bcid" :style='{zIndex:zIndex}'>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				text: '',
				codeUrl: '',
				scan: '',
				zIndex: -1
			}
		},
		methods: {
			// 调用摄像头扫描
			startRecognize() {
				this.zIndex = 9999
				let that = this
				if (!window.plus) {
					this.zIndex = -1
					return
				}
				// 初始化扫描控件
				this.scan = new window.plus.barcode.Barcode('bcid')
				this.scan.onmarked = onmarked
				// 调用开始扫描
				this.startScan()
				// 扫描后回调
				function onmarked(type, result) {
					switch (type) {
						case window.plus.barcode.QR:
							type = 'QR'
							break
						case window.plus.barcode.EAN13:
							type = 'EAN13'
							break
						case window.plus.barcode.EAN8:
							type = 'EAN8'
							break
						default:
							type = '其它' + type
							break
					}
					result = result.replace(/\n/g, '')
					that.codeUrl = result
					// 返回值
					window.alert(result)
					that.zIndex = -1
					that.closeScan()
				}
			},
			// 本地图片选择
			openphoto() {
				if (!window.plus) {
					window.Toast(this.$t('h5plus.err_cannot_pic'))
					return
				}
				window.plus.gallery.pick((path) => {
					window.plus.barcode.scan(
						path,
						(type, result) => {
							result = result.replace(/\n/g, '')
							this.codeUrl = result
							window.alert(this.codeUrl)
							this.closeScan()
						},
						() => {
							alert('QR Code not found')
						}
					)
				}),
					{ filters: 'images' }
			},
			//开始扫描
			startScan() {
				if (!window.plus || !this.scan) return
				this.scan.start()
			},
			//关闭扫描
			cancelScan() {
				this.zIndex = -1
				if (!window.plus || !this.scan) return
				this.scan.cancel()
			},
			//关闭条码识别控件
			closeScan() {
				this.zIndex = -1
				if (!window.plus || !this.scan) return
				this.scan.close()
			}
		}
	}
</script>

<style lang="less">
	#bcid {
		width: 100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 3rem;
		text-align: center;
		color: #fff;
	}
</style>