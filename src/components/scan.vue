<template>
	<div class="scan">
		<button @click='startRecognize'>触发按钮</button>
		<div id="bcid" :style='{zIndex:zIndex}'></div>
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
			//初始化扫描控件
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
					window.alert(`type: ${type}`)
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
			//开始扫描
			startScan() {
				if (!window.plus) return
				this.scan.start()
			},
			//关闭扫描
			cancelScan() {
				this.zIndex = -1
				if (!window.plus) return
				this.scan.cancel()
			},
			//关闭条码识别控件
			closeScan() {
				this.zIndex = -1
				if (!window.plus) return
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