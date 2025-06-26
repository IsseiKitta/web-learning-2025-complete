const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // --- 1. 既存データのクリーンアップ ---
  // 依存関係を考慮し、関連テーブルから削除していく
  console.log("Deleting existing data...");
  await prisma.taskGroup.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.group.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("Existing data deleted.");

  // --- 2. ユーザーの作成 ---
  console.log("Creating users...");
  const hashedPasswordTaro = await bcrypt.hash("password-taro", 10);
  const userTaro = await prisma.user.create({
    data: {
      username: "Taro",
      email: "taro@example.com",
      password_hash: hashedPasswordTaro,
    },
  });

  const hashedPasswordJiro = await bcrypt.hash("password-jiro", 10);
  const userJiro = await prisma.user.create({
    data: {
      username: "Jiro",
      email: "jiro@example.com",
      password_hash: hashedPasswordJiro,
    },
  });
  console.log(`Created users: ${userTaro.username}, ${userJiro.username}`);

  // --- 3. グループの作成 ---
  console.log("Creating groups...");
  const groupWork = await prisma.group.create({
    data: {
      name: "仕事",
      user_id: userTaro.id, // Taroさんのグループ
    },
  });

  const groupPrivate = await prisma.group.create({
    data: {
      name: "プライベート",
      user_id: userTaro.id, // Taroさんのグループ
    },
  });
  console.log(`Created groups: ${groupWork.name}, ${groupPrivate.name}`);

  // --- 4. タスクの作成 ---
  console.log("Creating tasks...");
  const task1 = await prisma.task.create({
    data: {
      title: "クライアントにメール返信",
      description: "A社とB社の件について",
      user_id: userTaro.id, // Taroさんのタスク
      completed: false,
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: "牛乳を買う",
      user_id: userTaro.id, // Taroさんのタスク
      completed: true,
      due_date: new Date(),
    },
  });

  const task3 = await prisma.task.create({
    data: {
      title: "ジムに行く",
      user_id: userJiro.id, // Jiroさんのタスク
      completed: false,
    },
  });
  console.log(`Created tasks: ${task1.title}, ${task2.title}, ${task3.title}`);

  // --- 5. タスクとグループの紐付け (多対多リレーション) ---
  console.log("Connecting tasks and groups...");
  await prisma.taskGroup.create({
    data: {
      task_id: task1.id, // 'クライアントにメール返信'タスク
      group_id: groupWork.id, // '仕事'グループ
    },
  });

  await prisma.taskGroup.create({
    data: {
      task_id: task2.id, // '牛乳を買う'タスク
      group_id: groupPrivate.id, // 'プライベート'グループ
    },
  });
  console.log("Tasks and groups connected.");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // データベース接続を閉じる
    await prisma.$disconnect();
  });
