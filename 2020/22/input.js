let p1 = `6
25
8
24
30
46
42
32
27
48
5
2
14
28
37
17
9
22
40
33
3
50
47
19
41`.split('\n').map(Number);

let p2 = `1
18
31
39
16
10
35
29
26
44
21
7
45
4
20
38
15
11
34
36
49
13
23
43
12`.split('\n').map(Number);

let t1 = `9
2
6
3
1`.split('\n').map(Number);

let t2 = `5
8
4
7
10`.split('\n').map(Number);

module.exports = {p1, p2, t1, t2};