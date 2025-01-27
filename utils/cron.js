const cron = require("node-cron");

let lastRunTime = Date.now();

// Monitor de saúde do sistema
cron.schedule("*/10 * * * *", () => {
  const now = Date.now();
  const timeSinceLastRun = now - lastRunTime;
  
  if (timeSinceLastRun > 360000) { // 6 minutos
    console.error("Alerta: Sistema pode estar com problemas. Última verificação há:", 
      Math.round(timeSinceLastRun / 1000 / 60), "minutos");
  }
  
  lastRunTime = now;
});
