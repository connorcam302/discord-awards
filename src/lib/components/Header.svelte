<div class="h-48 md:h-72">
	<div class="container h-48 md:h-72">
		<div class="floodlight floodlight-left -z-20"></div>
		<div class="floodlight floodlight-right -z-20"></div>
		<div class="bg-background absolute top-[110px] -z-10 h-96 w-dvw md:top-[178px]"></div>
		<div class="relative w-full">
			<div
				class="font-montserrat text left-0 right-0 z-10 h-8 text-center text-[1.85rem] tracking-widest md:h-16 md:text-[4rem]"
			>
				The Discord Awards
			</div>
			<div class="w-full">
				<div class="absolute h-10 w-full md:h-20" id="myDiv">
					<div
						class="font-montserrat inline-block w-full text-center text-[1.85rem] font-bold tracking-widest text-neutral-600 md:text-[4rem]"
					>
						The Discord Awards
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@reference "tailwindcss";

	#myDiv {
		-webkit-transform: perspective(400px) rotateX(30deg) scaleY(-1) scaleX(1.04);
	}
	#shadow-text {
		-webkit-transform: rotateY(180deg);
		-moz-transform: rotateY(180deg);
		-o-transform: rotateY(180deg);
		-ms-transform: rotateY(180deg);
	}
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.floodlight {
		position: absolute;
		width: 300px;
		height: 300px;
		background: radial-gradient(
			ellipse 150% 100% at 50% 50%,
			rgba(255, 241, 163, 0.8) 0%,
			rgba(255, 221, 163, 0.5) 20%,
			rgba(255, 201, 163, 0.3) 40%,
			rgba(255, 181, 163, 0.1) 60%,
			transparent 100%
		);
		filter: blur(40px);
		animation: rotate 8s linear infinite;
		transform-origin: center;
	}

	.floodlight::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 400px;
		height: 400px;
		position: absolute;
		background: radial-gradient(
			ellipse 200% 100% at 50% 50%,
			rgba(255, 234, 128, 0.4) 0%,
			rgba(252, 242, 187, 0.2) 30%,
			transparent 70%
		);
		filter: blur(60px);
	}

	.floodlight-left {
		left: 18%;
	}

	.floodlight-right {
		right: 18%;
		animation-direction: reverse;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.text {
		z-index: 10;
		font-weight: bold;
		color: #ffffff;
		text-shadow:
			0 0 20px rgba(255, 255, 255, 0.5),
			0 0 40px rgba(255, 255, 255, 0.3),
			0 4px 8px rgba(0, 0, 0, 0.8);
	}

	@media (max-width: 768px) {
		.floodlight {
			width: 200px;
			height: 200px;
		}
		#myDiv {
			-webkit-transform: perspective(400px) rotateX(30deg) scaleY(-1) scaleX(1.02);
		}
	}
</style>
