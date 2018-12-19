var WaveLoading = {
    IsdrawCircled: false,
    render: function (options) {
        if (!options) return;
        var canvas,
            ctx,
            nowRange, // 进度值
            mW, // 画布宽度
            mH, // 画布高度
            r, // 圆心
            cR,
            lineWidth,
            speed,
            axisLength,
            sX,
            waveWidth,
            waveHeight,
            xOffset; // 半径
        canvas = document.getElementById(options.target);
        ctx = canvas.getContext('2d');
        nowRange = options.nowRange || 50;
        lineWidth = options.lineWidth || 1;
        speed = options.speed || 0.05;
        mW = canvas.width = 200;
        mH = canvas.height = 200;
        r = mH / 2;
        cR = r - 32 * lineWidth;
        //Sin 曲线属性
        sX = 0;
        axisLength = mW; //轴长
        waveWidth = 0.02 ;   //波浪宽度,数越小越宽
        waveHeight = 18; //波浪高度,数越大越高
        // speed = 0.06; //波浪速度，数越大速度越快
        xOffset = 0; //波浪x偏移量
        let that = this
        function init() {
            ctx.clearRect(0, 0, mW, mH);
            if(that.IsdrawCircled == false){
                that.drawCircle(ctx, r, cR);
            }
            that.drawSin(xOffset+Math.PI*0.7, 'rgba(24, 133, 249, 0.5)', waveHeight, ctx, sX, axisLength, waveWidth, mH, nowRange);
            that.drawSin(xOffset, 'rgba(24, 133, 249, 0.7)', waveHeight, ctx, sX, axisLength, waveWidth, mH, nowRange);
            that.drawSin(xOffset-Math.PI*0.7, 'rgba(24, 133, 249, 0.9)', waveHeight, ctx, sX, axisLength, waveWidth, mH, nowRange);
            that.drawText(ctx, cR, r, nowRange);

            xOffset += speed;
            requestAnimationFrame(init)
        }
        requestAnimationFrame(init)
    },
    drawCircle: function (ctx, r, cR) {
        ctx.beginPath();
        ctx.strokeStyle = '#1885F9';
        ctx.arc(r, r, cR+1, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(r, r, cR, 0, 2 * Math.PI);
        // ctx.clip();
        this.IsdrawCircled = true;
    },
    drawSin: function (xOffset, color, waveHeight, ctx, sX, axisLength, waveWidth, mH, nowRange) {
        ctx.save();

        var points=[];  //用于存放绘制Sin曲线的点

        ctx.beginPath();
        //在整个轴长上取点
        for(var x = sX; x < sX + axisLength; x += 20 / axisLength){
            //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
            var y = Math.sin((-sX - x) * waveWidth + xOffset) * 0.8 + 0.1;

            var dY = mH * (1 - nowRange / 100 );

            points.push([x, dY + y * waveHeight]);
            ctx.lineTo(x, dY + y * waveHeight);
        }

        //封闭路径
        ctx.lineTo(axisLength, mH);
        ctx.lineTo(sX, mH);
        ctx.lineTo(points[0][0],points[0][1]);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
    },
    drawText: function (ctx, cR, r, nowRange) {
        ctx.save();

        var size = 0.4*cR;
        ctx.font = size + 'px Microsoft Yahei';
        ctx.textAlign = 'center';
        if(nowRange > 50) {
            ctx.fillStyle = "#fff";
        } else {
            ctx.fillStyle = "#008FFF";
        }
        
        ctx.fillText(~~nowRange + '%', r, r + size / 2);

        ctx.restore();
    }
}

export default WaveLoading
