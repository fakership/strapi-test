module.exports = () => {
  return async (ctx, next) => {
      await next();

      // 检查请求是否成功
      if (ctx.status >= 200 && ctx.status < 300) {
        // 自定义成功响应的外层数据结构
        ctx.body = {
          ResponseMetadata: {
            RequestId: '${RequestId}',
          },
          Result: ctx.body.data
        };
      } else {
        // 自定义错误响应的外层数据结构
        ctx.body = {
          ResponseMetadata: {
            RequestId: '${RequestId}',
            Error: {
              Message: ctx.message,
              Code: ctx.status
            }
          },
          Result: ctx.body.data
        };
      }
    }

};
