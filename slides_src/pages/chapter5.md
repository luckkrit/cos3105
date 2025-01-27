---
title: CPU Scheduling
---

# CPU Scheduling

---

# การจัดการ CPU

### ในการทำงานของโพรเซส

จำเป็นต้องมีการเรียกใช้ทรัพยากรของระบบซึ่งมีอยู่อย่างจำกัด ระบบ
จำเป็นต้องมีการแบ่งสรรและจัดลำดับการเข้าใช้งานของทรัพยากร ซีพียูเป็นทรัพยากรที่จำเป็นต้องมีการ
จัดลำดับให้หลายโพรเซสเข้าไปใช้งาน ดังนั้นเมื่อซีพียูว่างและมีโพรเซสเข้าคิวรออยู่ที่คิวพร้อม ต้องการเข้า
ไปใช้งานที่ซีพียู

- CPU Scheduler (ตัวจัดการCPU)

จะทำหน้าที่เลือกโพรเซสที่อยู่ในคิวพร้อม
ออกมาทีละโพรเซส และมอบซีพียูให้โพรเซสที่ได้รับเลือก ทำให้โพรเซสนั้นเข้าไปทำงานที่ซีพียูได้ และ
เปลี่ยนสถานะจากสถานะพร้อมเป็นสถานะทำงาน

- CPU Scheduling (การจัดการCPU)

เป็นหลักการทำงานหนึ่งของระบบปฏิบัติการ ที่ทำให้
คอมพิวเตอร์มีความสามารถในการรันโปรแกรมหลาย ๆ โปรแกรมในเวลาเดียวกัน ซึ่งการแบ่งเวลาการเข้า
ใช้ซีพียูให้กับโพรเซสที่อาจถูกส่งมาหลาย ๆ โพรเซสพร้อม ๆ กัน ในขณะที่ซีพียูอาจมีจำนวนน้อยกว่า
โพรเซส หรืออาจมีซีพียูเพียงตัวเดียว จะทำให้คอมพิวเตอร์สามารถทำงานได้ปริมาณงานที่มากขึ้นกว่าการ
ให้ซีพียูทำงานให้เสร็จทีละโพรเซส

---

# หลักการการจัดการ CPU

- single programming

ในระบบคอมพิวเตอร์ที่มีความสามารถรันโปรแกรมได้ทีละโปรแกรมการทำงานของระบบ
ก็จะไม่ซับซ้อน ซีพียูจะหยุดการทำงานในระหว่างที่คอยอินพุต/เอาต์พุตนี้ ซึ่งการคอยเหล่านี้เป็นการ
เสียเวลาโดยเปล่าประโยชน์ เพราะซีพียูไม่ได้ทำงานเลย

- multiprogramming

ส่วนหลักในการรันหลายโปรแกรม เราพยายามใช้
เวลาที่ซีพียูต้องคอยนี้ทำงานอย่างอื่นต่อไป ดังนั้นเมื่อใดก็ตามที่ซีพียูต้องคอย และยังมีโปรแกรมในหน่วยความจำหลายโปรแกรมที่คอยการใช้
ซีพียูอยู่ เราจะจัดให้ซีพียูทำงานในโปรแกรมเหล่านั้นทันที ซึ่งระบบจะจัดการนำเอาโปรแกรมที่คอย
อินพุต/เอาต์พุตออกไปก่อน เพื่อที่จะให้โปรแกรมอื่นที่คอยใช้ซีพียูนี้สามารถเข้ามาได้

---

# หลักการการจัดการ CPU (2)

<div class="flex gap-3">

<div>

- การทำงานของโปรเซสจะประกอบด้วย ช่วงเวลาประมวลผล (CPU Burst Time) และช่วงเวลาที่รอการรับส่งข้อมูล (I/O Burst Time)

- ทั้งสองช่วงเวลาจะสลับกันเป็นวัตจักร เรียกว่าวัตจักรประมวลผลและรับส่งข้อมูล (CPU-I/O Burst Cycle)

- การกระจายช่วงเวลาประมวลผล (CPU Burst Time) ไปให้โปรเซสต่าง ๆ อย่างเหมาะสมเป็นประเด็นที่สำคัญ

</div>

<img src="/images/chapter5/cpu_io_burst.jpg" class="w-[200px]" />

</div>

---

# หลักการการจัดการ CPU (3)

- การศึกษาทางสถิติเกี่ยวกับช่วงเวลาประมวลผล (CPU Burst Time) พบว่า
  ช่วงเวลาที่สั้น (short bursts) จะเกิดถี่กว่าช่วงเวลาที่ยาว (long bursts) นั่นคือ หน่วยประมวลผลกลางจะทำงานสั้น ๆ เป็นส่วนใหญ่ ไม่ค่อยทำงานที่ใช้เวลานาน

<div class="flex gap-3 mt-3">
    <img src="/images/chapter5/cpu_burst_time_graph.jpg" class="w-1/2" />
    <img src="/images/chapter5/cpu_burst_time_graph2.png" class="w-1/2" />
</div>

---

# CPU Scheduler

- ตัวจัดตารางเวลาประมวลผล (CPU Scheduler) จะเลือกโปรเซสจากคิวพร้อมทำงาน (ready queue) และส่งไปให้แกนประมวลผล (core) อันใดอันหนึ่งของหน่วยประมวลผล

- มีหลายอัลกอริทึมให้ใช้ในการเรียงโปรเซสในคิว โปรเซสที่เข้าคิวก่อนอาจจะไม่ได้ทำงานก่อนโปรเซสที่เข้าคิวทีหลังเสมอไป

- การจัดตารางเวลาประมวลผล จะทำเมื่อโปรเซสเปลี่ยนสถานะดังต่อไปนี้

  1. เมื่อโปรเซสรอรับส่งข้อมูลหรือรอสัญญาณ (จาก running เป็น waiting)
  2. เมื่อโปรเซสถูกขัดจังหวะ (interrupted จาก running เป็น ready)
  3. เมื่อโปรเซสรับส่งข้อมูลเสร็จแล้ว (จาก waiting เป็น ready)
  4. เมื่อโปรเซสหยุดทำงาน (สถานะเป็น terminated)

- ในกรณี 1 (รอรับส่งข้อมูล) และ 4 (หยุดทำงาน) ตัวจัดตารางเวลาจะนำโปรเซสอื่นขึ้นมาให้หน่วยประมวลผลทำงานแทน

- ในกรณี 2 (ถูกขัดจังหวะ) และ 3 (รับส่งข้อมูลเสร็จ) ตัวจัดตารางเวลาอาจจะเลือกได้ว่าจะนำโปรเซสอื่นขึ้นมาหรือไม่

---

# CPU Scheduling

<div class="flex gap-3">
<div class="w-1/2">

- ชนิดของ CPU Scheduling

1.  Non-Preemptive Scheduling: ถูกใช้เมื่อกระบวนการยุติ หรือเมื่อกระบวนการเปลี่ยนจากสถานะกำลังทำงานเป็นสถานะรอ

        - ซึ่งอ้างอิงจากการจัดตารางเวลาประมวลผล (จากสไลด์หน้าที่แล้ว) ดังนั้นระบบปฏิบัติการจะจัดตารางการประมวลผลได้ก็คือ กรณี 1 (รอรับส่งข้อมูล) และกรณี 4 (หยุดทำงาน)

        - นั่นคือระบบปฏิบัติการในอดีตจะจัดตารางเวลาประมวลผลได้ก็ต่อเมื่อโปรเซสคืนหน่วยประมวลผลกลับให้ระบบปฏิบัติการเท่านั้น เนื่องจากระบบปฏิบัติการไม่อาจจะแทรกแซงการทำงานของโปรเซสได้จึงเรียกว่าเป็นการจัดตารางเวลาแบบแทรกแซงไม่ได้ (non-preemptive scheduling)

</div>
<div class="flex flex-col">
<div class="w-[404px]">
หรือการจัดตารางเวลาแบบร่วมมือกัน (cooperative scheduling) 
เพราะต้องอาศัยความร่วมมือระหว่างโปรเซส กับระบบปฏิบัติการ
</div>
<img src="/images/chapter5/nonpre.png" class="mt-3" />
</div>
</div>

---

# CPU Scheduling (2)

<div class="flex gap-3">

<div>

2. Preemptive Scheduling: ถูกใช้เมื่อกระบวนการเปลี่ยนจากสถานะกำลังทำงานเป็นสถานะพร้อม หรือจากสถานะรอเป็นสถานะพร้อม

   - ระบบปฏิบัติการในปัจจุบันใช้การจัดตารางเวลาประมวลผลแบบแทรกแซงได้ (preemptive scheduling) จึงสามารถแทรกแซงการทำงานของโปรเซสได้ ไม่ต้องรอให้โปรเซสคืนหน่วยประมวลผล
   - ข้อควรระวัง :

     1. การจัดตารางเวลาแบบแทรกแซงได้ (preemptive scheduling) อาจจะทำให้เกิดสภาวะการแข่งขัน (race condition) เมื่อมีข้อมูลที่ถูกใช้ร่วมกันระหว่างหลายโปรเซส

</div>
<div class="flex flex-col">
<div>

2.  หากโปรเซสหนึ่งถูกแทรกแซงขณะที่ยังเขียนข้อมูลไม่ครบถ้วน โปรเซสใหม่อาจจะทำงานผิดพลาดได้เมื่อนำข้อมูลที่ไม่ครบถ้วนนั้นไปประมวลผลต่อ
</div>
<img src="/images/chapter5/pre-2.png" class="h-[324px]" />
</div>
</div>

---

# CPU Scheduling (3)

<img src="/images/chapter5/cpu_scheduling_type.png" class="w-full" />

---

# Dispatcher

- Dispatcher จะทำงานต่อจาก CPU Scheduler เมื่อ CPU Scheduler เลือก Process ที่จะนำมาทำงานได้แล้ว ก็จะส่งต่อให้ Dispatcher ซึ่งเป็นโมดูลที่ทำหน้าที่ควบคุมการครอบครองซีพียูของโพรเซส

<div class="flex gap-3">

<div>

- โมดูลนี้ประกอบด้วยฟังก์ชัน

  1. การย้าย Context
  2. การย้ายไป User mode
  3. กระโดดไปยังตำแหน่งที่เหมาะสมของโปรแกรม เพื่อที่จะเริ่มรันโปรแกรมนั้นใหม่อีกครั้ง

- ลักษณะของ Dispatcher คือการทำ Context switching ดังนั้นควรมีการทำงานที่เร็วที่สุดเท่าที่
  จะทำได้ เพราะว่ามันจะต้องทำงานทุกครั้งที่มีการย้ายโพรเซส ซึ่งเวลาที่ถูกใช้ไปกับการย้ายโพรเซสที่กำลัง
  ใช้ซีพียูให้ออกจากซีพียู และนำโพรเซสอื่นเข้าใช้ซีพียูแทนเช่นนี้เรียกว่า Dispatch latency

</div>

<img src="/images/chapter5/dispatcher.jpg" class="w-[200px]" />

</div>

---

# หลักเกณฑ์ในการวิเคราะห์ประสิทธิภาพ (Scheduling Criteria)

- มีอัลกอริทึมจำนวนมากในการจัดตารางเวลาประมวลผล การเปรียบเทียบระหว่างอัลกอริทึมต่าง ๆ จะใช้เกณฑ์ต่อไปนี้

  1. การใช้งานหน่วยประมวลผล (CPU Utilization)
     - พยายามให้หน่วยประมวลผลทำงานตลอดเวลา
  2. อัตราการเสร็จงาน (Throughput)

     - จำนวนโปรเซสที่ทำงานเสร็จในเวลาหนึ่ง

  3. เวลารอเสร็จงาน (Turnaround Time)
     - เวลาที่โปรเซสหนึ่งใช้ในการทำงานจนเสร็จ

---

# หลักเกณฑ์ในการวิเคราะห์ประสิทธิภาพ (Scheduling Criteria) (2)

- มีอัลกอริทึมจำนวนมากในการจัดตารางเวลาประมวลผล การเปรียบเทียบระหว่างอัลกอริทึมต่าง ๆ จะใช้เกณฑ์ต่อไปนี้

  4. เวลารอหน่วยประมวลผล (Waiting Time)
     - เวลาที่โปรเซสหนึ่งต้องรอในคิวพร้อมทำงาน (ready queue)
  5. เวลารอตอบสนอง (Response Time)
     - เวลาตั้งแต่ผู้ใช้งานเรียกใช้งานจนกระทั่งมีการตอบสนองเป็นครั้งแรก

---

# First-Come, First-Served (FCFS) Scheduling

- เป็นอัลกอริทึมที่ง่ายที่สุด โดยจะกำหนดให้โพรเซสที่ร้องขอซีพียูก่อน เป็นโพรเซสที่ได้รับซีพียูก่อน
  เมื่อมีโพรเซสที่อยู่ในสถานะพร้อมที่จะทำงาน โพรเซสนั้นจะถูกนำเข้าไปต่อท้ายคิวพร้อม เมื่อซีพียูว่าง
  ระบบปฏิบัติการจะเรียกกำหนดการซีพียู เพื่อให้พิจารณามอบซีพียูให้แก่โพรเซสที่อยู่ต้นคิวของคิวพร้อม

- **ตัวอย่าง 1**

<div class="flex gap-3">

<div>

| Process | Arrival Time | Burst Time |
| :-----: | :----------: | :--------: |
|   P1    |      0       |     5      |
|   P2    |      0       |     3      |
|   P3    |      0       |     8      |

</div>

<div class="flex flex-col mx-auto w-fit mt-3 justify-center">

<div class="text-center">

**Gantt Chart**

</div>

<div class="flex">
<div class="size-10 border border-black dark:border-white p-2">P<sub>1</sub></div>
<div class="size-10 border border-black border-l-0 border-r-0 dark:border-white p-2">P<sub>2</sub></div>
<div class="size-10 border border-black dark:border-white p-2">P<sub>3</sub></div>
</div>

<div class="flex">
<div class="">0</div>
<div class="ml-6">5</div>
<div class="ml-8">8</div>
<div class="ml-6">16</div>
</div>
</div>

</div>

---

# First-Come, First-Served (FCFS) Scheduling (2)

- **ตัวอย่าง 2**

<div class="flex gap-3">

<div>

| Process | Arrival Time | Burst Time |
| :-----: | :----------: | :--------: |
|   P1    |      0       |     24     |
|   P2    |      0       |     3      |
|   P3    |      0       |     3      |

</div>

<div class="flex flex-col mx-auto w-fit mt-3 justify-center">

<div class="text-center">

**Gantt Chart**

</div>

<div class="flex">
<div class="size-10 border border-black dark:border-white p-2">P<sub>1</sub></div>
<div class="size-10 border border-black border-l-0 border-r-0 dark:border-white p-2">P<sub>2</sub></div>
<div class="size-10 border border-black dark:border-white p-2">P<sub>3</sub></div>
</div>

<div class="flex">
<div class="">0</div>
<div class="ml-6">24</div>
<div class="ml-6">27</div>
<div class="ml-4">30</div>
</div>
</div>

</div>

---

# First-Come, First-Served (FCFS) Scheduling (3)

- **สรุปตัวอย่าง 2**

- กรณีที่ในคิวพร้อมของระบบมีทั้งโพรเซสที่เน้นซีพียู และโพรเซสที่เน้น I/O จะพบว่า โพรเซสที่เน้น I/O
  จะต้องเสียเวลารอนานมาก เพื่อเข้าใช้งานซีพียูในระยะเวลาที่ไม่นานมากนัก
  ซึ่งจะทำให้เกิดปัญหา **Convoy effect** คือ เหตุการณ์ที่โพรเซส ขนาดเล็กในระบบ จะต้องเสียเวลารอ
  โพรเซสขนาดใหญ่ที่ครอบครองซีพียูเป็นเวลานาน การทำงานของอัลกอริทึมนี้ เป็นการทำงานที่ไม่สามารถ
  ขัดจังหวะ หรือแทรกกลางได้ (Non-preemptive process) ซึ่งจะไม่เหมาะกับระบบที่ต้องมีการแบ่งส่วน
  การทำงานให้งานแต่ละงานได้ใช้ซีพียูอย่างทั่วถึง

---

# Shortest-Job-First (SJF) Scheduling

- จากอัลกอริทึมมาก่อนบริการก่อนนั้น พบว่าค่าเฉลี่ยของเวลาครบวงงาน และค่าเฉลี่ยของเวลารอ
  มีค่าสูง โดยเฉพาะกรณีที่ในคิวพร้อมมีโพรเซสที่ต้องการใช้ซีพียูเป็นเวลาที่แตกต่างกัน อัลกอริทึมของงาน
  สั้นทำก่อน จะพยายามลดค่าเฉลี่ยของเวลาครบวงงาน และค่าเฉลี่ยของเวลารอ โดยกำหนดให้โพรเซสที่
  ต้องการใช้ซีพียูเป็นระยะเวลาน้อยได้เข้าใช้ซีพียูก่อนโพรเซสที่ต้องการใช้ซีพียูเป็นระยะเวลานาน

- **ตัวอย่าง 3**

<div class="flex gap-3">

<div>

| Process | Arrival Time | Burst Time |
| :-----: | :----------: | :--------: |
|   P1    |      0       |     6      |
|   P2    |      0       |     8      |
|   P3    |      0       |     7      |
|   P4    |      0       |     3      |

</div>

<div class="flex flex-col mx-auto w-fit mt-3 justify-center">

<div class="text-center">

**Gantt Chart**

</div>

<div class="flex">
<div class="size-10 border border-black dark:border-white p-2">P<sub>4</sub></div>
<div class="size-10 border border-black border-l-0 dark:border-white p-2">P<sub>1</sub></div>
<div class="size-10 border border-black border-l-0 border-r-0 dark:border-white p-2">P<sub>3</sub></div>
<div class="size-10 border border-black dark:border-white p-2">P<sub>2</sub></div>
</div>

<div class="flex">
<div class="">0</div>
<div class="ml-6">3</div>
<div class="ml-8">9</div>
<div class="ml-6">16</div>
<div class="ml-6">24</div>
</div>
</div>

</div>

---

# Shortest-Job-First (SJF) Scheduling (2)

- **ตัวอย่าง 4**

<v-switch>
<template #0>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:true,color:'bg-red-500', status:'', total:0, order:0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'', total:0, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:2,bt:10,show:false,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:2}
  ]">

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #1>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'✔', total:1, order:0},
  {name:'P',id:2,at:1,bt:5,show:true,color:'bg-pink-500', status:'', total:0, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'', total:0, order: 3},
  {name:'P',id:4,at:2,bt:10,show:false,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #2>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'✔', total:2, order: 0},
  {name:'P',id:2,at:1,bt:5,show:true,color:'bg-pink-500', status:'', total:0, order: 1},
  {name:'P',id:3,at:2,bt:7,show:true,color:'bg-orange-500', status:'', total:0, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'', total:0, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #3>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'✔', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:true,color:'bg-pink-500', status:'', total:0, order: 1},
  {name:'P',id:3,at:2,bt:7,show:true,color:'bg-orange-500', status:'', total:0, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'', total:0, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #4>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'✔', total:1, order: 1},
  {name:'P',id:3,at:2,bt:7,show:true,color:'bg-orange-500', status:'', total:0, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:true,color:'bg-green-500', status:'', total:0, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #5>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'✔', total:2, order: 1},
  {name:'P',id:3,at:2,bt:7,show:true,color:'bg-orange-500', status:'', total:0, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:true,color:'bg-green-500', status:'', total:0, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #6>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'✔', total:3, order: 1},
  {name:'P',id:3,at:2,bt:7,show:true,color:'bg-orange-500', status:'', total:0, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:true,color:'bg-green-500', status:'', total:0, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #7>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'✔', total:4, order: 1},
  {name:'P',id:3,at:2,bt:7,show:true,color:'bg-orange-500', status:'', total:0, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:true,color:'bg-green-500', status:'', total:0, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #8>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'✔', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:true,color:'bg-orange-500', status:'', total:0, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:true,color:'bg-green-500', status:'', total:0, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #9>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:true,color:'bg-orange-500', status:'', total:0, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'✔', total:1, order: 2}
  ]" >


**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #10>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:true,color:'bg-orange-500', status:'', total:0, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'✔', total:2, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #11>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'✔', total:1, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #12>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'✔', total:2, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >


**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #13>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'✔', total:3, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #14>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'✔', total:4, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #15>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'✔', total:5, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #16>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'✔', total:6, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #17>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'✔', total:7, order: 3},
  {name:'P',id:4,at:2,bt:10,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #18>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'❌', total:7, order: 3},
  {name:'P',id:4,at:2,bt:10,show:false,color:'bg-yellow-500', status:'✔', total:1, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #19>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'❌', total:7, order: 3},
  {name:'P',id:4,at:2,bt:10,show:false,color:'bg-yellow-500', status:'✔', total:2, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >


**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #20>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'❌', total:7, order: 3},
  {name:'P',id:4,at:2,bt:10,show:false,color:'bg-yellow-500', status:'✔', total:3, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #21>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'❌', total:7, order: 3},
  {name:'P',id:4,at:2,bt:10,show:false,color:'bg-yellow-500', status:'✔', total:4, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >


**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #22>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'❌', total:7, order: 3},
  {name:'P',id:4,at:2,bt:10,show:false,color:'bg-yellow-500', status:'✔', total:5, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >


**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #23>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'❌', total:7, order: 3},
  {name:'P',id:4,at:2,bt:10,show:false,color:'bg-yellow-500', status:'✔', total:6, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #24>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'❌', total:7, order: 3},
  {name:'P',id:4,at:2,bt:10,show:false,color:'bg-yellow-500', status:'✔', total:7, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #25>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'❌', total:7, order: 3},
  {name:'P',id:4,at:2,bt:10,show:false,color:'bg-yellow-500', status:'✔', total:8, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #26>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'❌', total:7, order: 3},
  {name:'P',id:4,at:2,bt:10,show:false,color:'bg-yellow-500', status:'✔', total:9, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #27>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'❌', total:7, order: 3},
  {name:'P',id:4,at:2,bt:10,show:false,color:'bg-yellow-500', status:'✔', total:10, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #28>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order: 0},
  {name:'P',id:2,at:1,bt:5,show:false,color:'bg-pink-500', status:'❌', total:5, order: 1},
  {name:'P',id:3,at:2,bt:7,show:false,color:'bg-orange-500', status:'❌', total:7, order: 3},
  {name:'P',id:4,at:2,bt:10,show:false,color:'bg-yellow-500', status:'❌', total:10, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order: 2}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
</v-switch>

---

# Shortest-Job-First (SJF) Scheduling (3)

- **ตัวอย่าง 5**

<v-switch>
<template #0>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:0, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'', total:0, order:0},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'', total:0, order: 0},
  {name:'P',id:3,at:2,bt:4,show:false,color:'bg-orange-500', status:'', total:0, order:0},
  {name:'P',id:4,at:2,bt:5,show:false,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:0}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #1>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:true,color:'bg-red-500', status:'', total:0, order:0},
  {name:'P',id:2,at:1,bt:1,show:true,color:'bg-pink-500', status:'', total:0, order: 0},
  {name:'P',id:3,at:2,bt:4,show:false,color:'bg-orange-500', status:'', total:0, order:0},
  {name:'P',id:4,at:2,bt:5,show:false,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:0}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #2>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:true,color:'bg-red-500', status:'', total:0, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'✔', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:2,bt:5,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #3>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'✔', total:1, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:2,bt:5,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #4>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'✔', total:2, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:2,bt:5,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:true,color:'bg-green-500', status:'', total:0, order:3}
  ]" >


**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #5>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'✔', total:3, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:2,bt:5,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:true,color:'bg-green-500', status:'', total:0, order:3}
  ]" >


**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #6>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:2,bt:5,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'✔', total:1, order:3}
  ]" >


**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #7>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:2,bt:5,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'✔', total:2, order:3}
  ]" >


**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #8>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:false,color:'bg-orange-500', status:'✔', total:1, order:4},
  {name:'P',id:4,at:2,bt:5,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order:3}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #9>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:false,color:'bg-orange-500', status:'✔', total:2, order:4},
  {name:'P',id:4,at:2,bt:5,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order:3}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #10>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:false,color:'bg-orange-500', status:'✔', total:3, order:4},
  {name:'P',id:4,at:2,bt:5,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order:3}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #11>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:false,color:'bg-orange-500', status:'✔', total:4, order:4},
  {name:'P',id:4,at:2,bt:5,show:true,color:'bg-yellow-500', status:'', total:0, order: 4},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order:3}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #12>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:false,color:'bg-orange-500', status:'❌', total:4, order:4},
  {name:'P',id:4,at:2,bt:5,show:false,color:'bg-yellow-500', status:'✔', total:1, order: 5},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order:3}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #13>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:false,color:'bg-orange-500', status:'❌', total:4, order:4},
  {name:'P',id:4,at:2,bt:5,show:false,color:'bg-yellow-500', status:'✔', total:2, order: 5},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order:3}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #14>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:false,color:'bg-orange-500', status:'❌', total:4, order:4},
  {name:'P',id:4,at:2,bt:5,show:false,color:'bg-yellow-500', status:'✔', total:3, order: 5},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order:3}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #15>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:false,color:'bg-orange-500', status:'❌', total:4, order:4},
  {name:'P',id:4,at:2,bt:5,show:false,color:'bg-yellow-500', status:'✔', total:4, order: 5},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order:3}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #16>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:false,color:'bg-orange-500', status:'❌', total:4, order:4},
  {name:'P',id:4,at:2,bt:5,show:false,color:'bg-yellow-500', status:'✔', total:5, order: 5},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order:3}
  ]" >




**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
<template #17>
<ProcessLayout :processes="[
  {name:'P',id:0,at:1,bt:1,show:false,color:'bg-gray-500', status:'', total:1, order:0},
  {name:'P',id:1,at:1,bt:3,show:false,color:'bg-red-500', status:'❌', total:3, order:2},
  {name:'P',id:2,at:1,bt:1,show:false,color:'bg-pink-500', status:'❌', total:1, order: 1},
  {name:'P',id:3,at:2,bt:4,show:false,color:'bg-orange-500', status:'❌', total:4, order:4},
  {name:'P',id:4,at:2,bt:5,show:false,color:'bg-yellow-500', status:'❌', total:5, order: 5},
  {name:'P',id:5,at:4,bt:2,show:false,color:'bg-green-500', status:'❌', total:2, order:3}
  ]" >



**ขณะ Process ทำงานอยู่ จะไม่มีการ Preemptive process**
</ProcessLayout>
</template>
</v-switch>

---

# Shortest Remaining Time First (SRTF) Scheduling

- **ตัวอย่าง 6**

<v-switch>
<template #0>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,show:false,color:'bg-red-500', status:'', total:0, order:1},
  {name:'P',id:2,at:4,bt:2,show:false,color:'bg-pink-500', status:'', total:0, order: 1},
  {name:'P',id:3,at:1,bt:8,show:false,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:0,bt:3,show:true,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:9,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #1>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,show:false,color:'bg-red-500', status:'', total:0, order:1},
  {name:'P',id:2,at:4,bt:2,show:false,color:'bg-pink-500', status:'', total:0, order: 1},
  {name:'P',id:3,at:1,bt:8,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:2, show:true,color:'bg-yellow-500', status:'✔', total:1, order: 0},
  {name:'P',id:5,at:9,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #2>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,show:true,color:'bg-red-500', status:'', total:0, order:1},
  {name:'P',id:2,at:4,bt:2,show:false,color:'bg-pink-500', status:'', total:0, order: 1},
  {name:'P',id:3,at:1,bt:8,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:true,color:'bg-yellow-500', status:'✔', total:2, order: 0},
  {name:'P',id:5,at:9,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #3>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,show:true,color:'bg-red-500', status:'', total:0, order:1},
  {name:'P',id:2,at:4,bt:2,show:false,color:'bg-pink-500', status:'', total:0, order: 1},
  {name:'P',id:3,at:1,bt:8,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'✔', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #4>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:3,show:true,color:'bg-red-500', status:'✔', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,show:true,color:'bg-pink-500', status:'', total:0, order: 1},
  {name:'P',id:3,at:1,bt:8,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #5>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:3,show:true,color:'bg-red-500', status:'⚠', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:true,color:'bg-pink-500', status:'✔', total:1, order: 1},
  {name:'P',id:3,at:1,bt:8,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #6>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:3,show:true,color:'bg-red-500', status:'⚠', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'✔', total:2, order: 1},
  {name:'P',id:3,at:1,bt:8,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #7>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:2,show:true,color:'bg-red-500', status:'✔', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:1, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #8>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:1,show:true,color:'bg-red-500', status:'✔', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:2, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,show:false,color:'bg-green-500', status:'', total:0, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #9>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:1,show:false,color:'bg-red-500', status:'✔', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:3, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,show:true,color:'bg-green-500', status:'', total:0, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #10>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:1,show:false,color:'bg-red-500', status:'❌', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:3, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,btNew:1,show:true,color:'bg-green-500', status:'✔', total:1, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #11>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:1,show:false,color:'bg-red-500', status:'❌', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:3, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,btNew:0,show:true,color:'bg-green-500', status:'✔', total:2, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #12>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:1,show:false,color:'bg-red-500', status:'❌', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:3, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,btNew:7,show:true,color:'bg-orange-500', status:'✔', total:1, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,btNew:0,show:false,color:'bg-green-500', status:'❌', total:2, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #13>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:1,show:false,color:'bg-red-500', status:'❌', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:3, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,btNew:6,show:true,color:'bg-orange-500', status:'✔', total:2, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,btNew:0,show:false,color:'bg-green-500', status:'❌', total:2, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #14>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:1,show:false,color:'bg-red-500', status:'❌', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:3, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,btNew:5,show:true,color:'bg-orange-500', status:'✔', total:3, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,btNew:0,show:false,color:'bg-green-500', status:'❌', total:2, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #15>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:1,show:false,color:'bg-red-500', status:'❌', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:3, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,btNew:4,show:true,color:'bg-orange-500', status:'✔', total:4, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,btNew:0,show:false,color:'bg-green-500', status:'❌', total:2, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #16>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:1,show:false,color:'bg-red-500', status:'❌', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:3, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,btNew:3,show:true,color:'bg-orange-500', status:'✔', total:5, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,btNew:0,show:false,color:'bg-green-500', status:'❌', total:2, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #17>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:1,show:false,color:'bg-red-500', status:'❌', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:3, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,btNew:2,show:true,color:'bg-orange-500', status:'✔', total:6, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,btNew:0,show:false,color:'bg-green-500', status:'❌', total:2, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #18>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:1,show:false,color:'bg-red-500', status:'❌', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:3, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,btNew:1,show:true,color:'bg-orange-500', status:'✔', total:7, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,btNew:0,show:false,color:'bg-green-500', status:'❌', total:2, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #19>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:1,show:false,color:'bg-red-500', status:'❌', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:3, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,btNew:0,show:true,color:'bg-orange-500', status:'✔', total:8, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,btNew:0,show:false,color:'bg-green-500', status:'❌', total:2, order:2}
  ]" >

**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
<template #20>
<ProcessLayout :processes="[
  {name:'P',id:1,at:2,bt:4,btNew:1,show:false,color:'bg-red-500', status:'❌', total:1, order:1},
  {name:'P',id:2,at:4,bt:2,btNew: 1,show:false,color:'bg-pink-500', status:'❌', total:2, order: 1},
  {name:'P',id:1,at:2,bt:0,btNew:0,show:false,color:'bg-red-500', status:'✔', total:3, order:1, preemptive:true},
  {name:'P',id:3,at:1,bt:8,btNew:0,show:false,color:'bg-orange-500', status:'❌', total:8, order:3},
  {name:'P',id:4,at:0,bt:3,btNew:1, show:false,color:'bg-yellow-500', status:'❌', total:3, order: 0},
  {name:'P',id:5,at:9,bt:2,btNew:0,show:false,color:'bg-green-500', status:'❌', total:2, order:2}
  ]" >


**ขณะ Process ทำงานอยู่ จะมีการ Preemptive process** โดยการ **CONTEXT SWITCHING**
</ProcessLayout>
</template>
</v-switch>


---

# Round-Robin (RR) Scheduling

- อัลกอริทึมนี้ถูกออกแบบมาเพื่อใช้สำหรับระบบแบ่งเวลา โดยมีการทำงานเหมือนอัลกอริทึมแบบ
มาก่อนบริการก่อน แต่กำหนดให้โพรเซสใช้ซีพียูในเวลาที่จำกัด เรียกว่า เวลาควอนตัม (Quantum time)
หรือ การแบ่งเวลา (time slice)

- ในการทำงาน ตัวจัดลำดับการใช้ซีพียูจะเลือกโพรเซสจากต้นคิวพร้อมเข้าไปทำงานเป็นเวลา 1
เวลาควอนตัม ภายในระยะเวลาที่กำหนดถ้าโพรเซสสามารถทำงานเสร็จ โพรเซสจะคืนซีพียูให้ระบบ แต่ถ้าโพรเซสไม่สามารถทำงานเสร็จภายในเวลา 1 เวลาควอนตัม โพรเซสจะถูกขัดจังหวะและถูกนำไป
ต่อท้ายคิวพร้อม เพื่อเปลี่ยนให้โพรเซสอื่นเข้าไปทำงานในซีพียูต่อไป

---

# Round-Robin (RR) Scheduling (2)

- **ตัวอย่าง 7**

<v-switch>
<template #0>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:5,show:true,color:'bg-red-500', status:'', total:0, order:0},
  {name:'P',id:2,at:1,bt:3,show:false,color:'bg-pink-500', status:'', total:0, order: 1},
  {name:'P',id:1,at:0,bt:0,show:false,color:'bg-red-500', status:'', total:0, order:1, preemptive:true},
  {name:'P',id:3,at:3,bt:6,show:false,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:5,bt:1,show:false,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:6,bt:4,show:false,color:'bg-green-500', status:'', total:0, order:2}]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #1>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:5,btNew:4,show:true,color:'bg-red-500', status:'✔', total:1, order:0},
  {name:'P',id:2,at:1,bt:3,show:true,color:'bg-pink-500', status:'', total:0, order: 1},
  {name:'P',id:1,at:0,bt:0,show:false,color:'bg-red-500', status:'', total:0, order:1, preemptive:true},
  {name:'P',id:3,at:3,bt:6,show:false,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:5,bt:1,show:false,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:6,bt:4,show:false,color:'bg-green-500', status:'', total:0, order:2}]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #2>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:5,btNew:3,show:true,color:'bg-red-500', status:'✔', total:2, order:0},
  {name:'P',id:2,at:1,bt:3,show:true,color:'bg-pink-500', status:'', total:0, order: 1},
  {name:'P',id:1,at:0,bt:0,show:false,color:'bg-red-500', status:'', total:0, order:1, preemptive:true},
  {name:'P',id:3,at:3,bt:6,show:false,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:5,bt:1,show:false,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:6,bt:4,show:false,color:'bg-green-500', status:'', total:0, order:2}]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #3>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:5,btNew:2,show:true,color:'bg-red-500', status:'✔', total:3, order:0},
  {name:'P',id:2,at:1,bt:3,show:true,color:'bg-pink-500', status:'', total:0, order: 1},
  {name:'P',id:1,at:0,bt:0,show:false,color:'bg-red-500', status:'', total:0, order:1, preemptive:true},
  {name:'P',id:3,at:3,bt:6,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:4,at:5,bt:1,show:false,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:6,bt:4,show:false,color:'bg-green-500', status:'', total:0, order:2}]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #4>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive:true},
  {name:'P',id:2,at:1,bt:3,btNew:2,show:true,color:'bg-pink-500', status:'✔', total:1, order: 1},
  {name:'P',id:3,at:3,bt:6,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:1,at:0,bt:5,btNew:2,show:true,color:'bg-red-500', status:'⚠', total:0, order:1},
  {name:'P',id:4,at:5,bt:1,show:false,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:6,bt:4,show:false,color:'bg-green-500', status:'', total:0, order:2}]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #5>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive:true},
  {name:'P',id:2,at:1,bt:3,btNew:1,show:true,color:'bg-pink-500', status:'✔', total:2, order: 1},
  {name:'P',id:3,at:3,bt:6,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:1,at:0,bt:5,btNew:2,show:true,color:'bg-red-500', status:'⚠', total:0, order:1},
  {name:'P',id:4,at:5,bt:1,show:true,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:6,bt:4,show:false,color:'bg-green-500', status:'', total:0, order:2}]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #6>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0,preemptive:true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:true,color:'bg-pink-500', status:'✔', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:1,at:0,bt:5,btNew:2,show:true,color:'bg-red-500', status:'⚠', total:0, order:1},
  {name:'P',id:4,at:5,bt:1,show:true,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:6,bt:4,show:true,color:'bg-green-500', status:'', total:0, order:2}]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #7>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,show:true,color:'bg-orange-500', status:'', total:0, order:3},
  {name:'P',id:1,at:0,bt:5,btNew:2,show:true,color:'bg-red-500', status:'⚠', total:0, order:1},
  {name:'P',id:4,at:5,bt:1,show:true,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:6,bt:4,show:true,color:'bg-green-500', status:'', total:0, order:2}]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #8>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:5,show:true,color:'bg-orange-500', status:'✔', total:1, order:3},
  {name:'P',id:1,at:0,bt:5,btNew:2,show:true,color:'bg-red-500', status:'⚠', total:0, order:1},
  {name:'P',id:4,at:5,bt:1,show:true,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:6,bt:4,show:true,color:'bg-green-500', status:'', total:0, order:2}]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #9>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:4,show:true,color:'bg-orange-500', status:'✔', total:2, order:3},
  {name:'P',id:1,at:0,bt:5,btNew:2,show:true,color:'bg-red-500', status:'⚠', total:0, order:1},
  {name:'P',id:4,at:5,bt:1,show:true,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:6,bt:4,show:true,color:'bg-green-500', status:'', total:0, order:2}]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #10>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:true,color:'bg-orange-500', status:'✔', total:3, order:3},
  {name:'P',id:1,at:0,bt:5,btNew:2,show:true,color:'bg-red-500', status:'⚠', total:0, order:1},
  {name:'P',id:4,at:5,bt:1,show:true,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:6,bt:4,show:true,color:'bg-green-500', status:'', total:0, order:2}]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #11>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'⚠', total:0, order:3, preemptive: true},
  {name:'P',id:1,at:0,bt:5,btNew:1,show:true,color:'bg-red-500', status:'✔', total:1, order:4},
  {name:'P',id:4,at:5,bt:1,show:true,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:6,bt:4,show:true,color:'bg-green-500', status:'', total:0, order:2},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:true,color:'bg-orange-500', status:'⚠', total:3, order:3},
  ]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #12>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'⚠', total:0, order:3, preemptive: true},
  {name:'P',id:1,at:0,bt:5,btNew:0,show:true,color:'bg-red-500', status:'✔', total:2, order:4},
  {name:'P',id:4,at:5,bt:1,show:true,color:'bg-yellow-500', status:'', total:0, order: 0},
  {name:'P',id:5,at:6,bt:4,show:true,color:'bg-green-500', status:'', total:0, order:2},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:true,color:'bg-orange-500', status:'⚠', total:3, order:3},
  ]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #13>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'⚠', total:0, order:3, preemptive: true},
  {name:'P',id:1,at:0,bt:5,btNew:0,show:false,color:'bg-red-500', status:'❌', total:2, order:4},
  {name:'P',id:4,at:5,bt:1,btNew:0,show:true,color:'bg-yellow-500', status:'✔', total:1, order: 5},
  {name:'P',id:5,at:6,bt:4,show:true,color:'bg-green-500', status:'', total:0, order:2},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:true,color:'bg-orange-500', status:'⚠', total:3, order:3},
  ]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #14>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'⚠', total:0, order:3, preemptive: true},
  {name:'P',id:1,at:0,bt:5,btNew:0,show:false,color:'bg-red-500', status:'❌', total:2, order:4},
  {name:'P',id:4,at:5,bt:1,btNew:0,show:false,color:'bg-yellow-500', status:'❌', total:1, order: 5},
  {name:'P',id:5,at:6,bt:4,show:true,color:'bg-green-500', status:'', total:0, order:2},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:true,color:'bg-orange-500', status:'⚠', total:3, order:3},
  ]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #15>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'⚠', total:0, order:3, preemptive: true},
  {name:'P',id:1,at:0,bt:5,btNew:0,show:false,color:'bg-red-500', status:'❌', total:2, order:4},
  {name:'P',id:4,at:5,bt:1,btNew:0,show:false,color:'bg-yellow-500', status:'❌', total:1, order: 5},
  {name:'P',id:5,at:6,bt:4,btNew:3,show:true,color:'bg-green-500', status:'✔', total:1, order:6},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:true,color:'bg-orange-500', status:'⚠', total:3, order:3},
  ]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #16>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'⚠', total:0, order:3, preemptive: true},
  {name:'P',id:1,at:0,bt:5,btNew:0,show:false,color:'bg-red-500', status:'❌', total:2, order:4},
  {name:'P',id:4,at:5,bt:1,btNew:0,show:false,color:'bg-yellow-500', status:'❌', total:1, order: 5},
  {name:'P',id:5,at:6,bt:4,btNew:2,show:true,color:'bg-green-500', status:'✔', total:2, order:6},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:true,color:'bg-orange-500', status:'⚠', total:3, order:3},
  ]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #17>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'⚠', total:0, order:3, preemptive: true},
  {name:'P',id:1,at:0,bt:5,btNew:0,show:false,color:'bg-red-500', status:'❌', total:2, order:4},
  {name:'P',id:4,at:5,bt:1,btNew:0,show:false,color:'bg-yellow-500', status:'❌', total:1, order: 5},
  {name:'P',id:5,at:6,bt:4,btNew:1,show:true,color:'bg-green-500', status:'✔', total:3, order:6},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:true,color:'bg-orange-500', status:'⚠', total:3, order:3},
  ]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #18>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'⚠', total:0, order:3, preemptive: true},
  {name:'P',id:1,at:0,bt:5,btNew:0,show:false,color:'bg-red-500', status:'❌', total:2, order:4},
  {name:'P',id:4,at:5,bt:1,btNew:0,show:false,color:'bg-yellow-500', status:'❌', total:1, order: 5},
  {name:'P',id:5,at:6,bt:4,btNew:1,show:false,color:'bg-green-500', status:'⚠', total:0, order:6, preemptive:true},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'✔', total:3, order:3, preemptive: true},
  {name:'P',id:5,at:6,bt:4,btNew:1,show:true,color:'bg-green-500', status:'⚠', total:3, order:6},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'✔', total:1, order:7},
  ]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #19>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'⚠', total:0, order:3, preemptive: true},
  {name:'P',id:1,at:0,bt:5,btNew:0,show:false,color:'bg-red-500', status:'❌', total:2, order:4},
  {name:'P',id:4,at:5,bt:1,btNew:0,show:false,color:'bg-yellow-500', status:'❌', total:1, order: 5},
  {name:'P',id:5,at:6,bt:4,btNew:1,show:false,color:'bg-green-500', status:'⚠', total:0, order:6, preemptive:true},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'✔', total:3, order:3, preemptive: true},
  {name:'P',id:5,at:6,bt:4,btNew:1,show:true,color:'bg-green-500', status:'⚠', total:3, order:6},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'✔', total:2, order:7},
  ]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #20>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'⚠', total:0, order:3, preemptive: true},
  {name:'P',id:1,at:0,bt:5,btNew:0,show:false,color:'bg-red-500', status:'❌', total:2, order:4},
  {name:'P',id:4,at:5,bt:1,btNew:0,show:false,color:'bg-yellow-500', status:'❌', total:1, order: 5},
  {name:'P',id:5,at:6,bt:4,btNew:1,show:false,color:'bg-green-500', status:'⚠', total:0, order:6, preemptive:true},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'✔', total:3, order:3, preemptive: true},
  {name:'P',id:5,at:6,bt:4,btNew:1,show:true,color:'bg-green-500', status:'⚠', total:3, order:6},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'✔', total:3, order:7},
  ]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #21>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'⚠', total:0, order:3, preemptive: true},
  {name:'P',id:1,at:0,bt:5,btNew:0,show:false,color:'bg-red-500', status:'❌', total:2, order:4},
  {name:'P',id:4,at:5,bt:1,btNew:0,show:false,color:'bg-yellow-500', status:'❌', total:1, order: 5},
  {name:'P',id:5,at:6,bt:4,btNew:1,show:false,color:'bg-green-500', status:'⚠', total:0, order:6, preemptive:true},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'✔', total:3, order:3, preemptive: true},
  {name:'P',id:5,at:6,bt:4,btNew:1,show:false,color:'bg-green-500', status:'⚠', total:3, order:6, preemptive: true},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'❌', total:3, order:7},
  {name:'P',id:5,at:6,bt:4,btNew:0,show:false,color:'bg-green-500', status:'✔', total:1, order:8},
  ]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
<template #22>
<ProcessLayout :processes="[
  {name:'P',id:1,at:0,bt:0,btNew:2,show:false,color:'bg-red-500', status:'⚠', total:3, order:0, preemptive: true},
  {name:'P',id:2,at:1,bt:3,btNew:0,show:false,color:'bg-pink-500', status:'❌', total:3, order: 1},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'⚠', total:0, order:3, preemptive: true},
  {name:'P',id:1,at:0,bt:5,btNew:0,show:false,color:'bg-red-500', status:'❌', total:2, order:4},
  {name:'P',id:4,at:5,bt:1,btNew:0,show:false,color:'bg-yellow-500', status:'❌', total:1, order: 5},
  {name:'P',id:5,at:6,bt:4,btNew:1,show:false,color:'bg-green-500', status:'⚠', total:0, order:6, preemptive:true},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'✔', total:3, order:3, preemptive: true},
  {name:'P',id:5,at:6,bt:4,btNew:1,show:false,color:'bg-green-500', status:'⚠', total:3, order:6, preemptive: true},
  {name:'P',id:3,at:3,bt:6,btNew:3,show:false,color:'bg-orange-500', status:'❌', total:3, order:7},
  {name:'P',id:5,at:6,bt:4,btNew:0,show:false,color:'bg-green-500', status:'❌', total:1, order:8},
  ]" >

**เมื่อกำหนดให้ใช้การจัดลำดับใช้งานซีพียูแบบวนรอบ ที่มีเวลาควอนตัมเท่ากับ 3.0 หน่วยเวลา** 

</ProcessLayout>
</template>
</v-switch>