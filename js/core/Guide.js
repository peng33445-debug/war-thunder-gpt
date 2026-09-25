const Guide = {

    // =========================
    // 项目基本信息
    // =========================

    project: {
        name: "Tank Game",
        version: "V0.1",
        platform: "Web",
        target: "Mobile"
    },


    // =========================
    // 当前开发状态
    // =========================

    development: {

        currentStage: "基础框架",

        completed: [
            "主菜单",
            "难度按钮",
            "试车场按钮",
            "移动摇杆",
            "炮塔摇杆",
            "坦克基础移动",
            "坦克加速与减速",
            "坦克车体转向",
            "炮塔独立旋转"
        ],

        currentTask: "完善V0.1基础战斗闭环",

        nextTask: "武器与开火系统"

    },


    // =========================
    // 游戏启动引导
    // =========================

    start: {

        defaultMode: "testField",

        playerSpawn: "center",

        playerEnabled: true,

        enemyEnabled: false,

        weaponEnabled: false

    },


    // =========================
    // 开发规则
    // =========================

    rules: {

        onlyAddFeatures: true,

        doNotRemoveFeatures: true,

        protectStableModules: true,

        doNotAssumeFilesExist: true,

        fullFileWhenModifying: true,

        testAfterModuleCompletion: true,

        preferNewModules: true

    }

};


export { Guide };
