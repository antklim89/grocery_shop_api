

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {

    /**
   * Simple example.
   * Every monday at 1am.
   */
    // '0 1 * * 1': () => {
    //
    // }
    '0 0 10 * * *': async () => {
        const expireDate = Date.now() - (1000 * 60 * 15);
        await strapi.services.order.delete({ created_at_lt: expireDate, status: 'draft' });
    },
};
