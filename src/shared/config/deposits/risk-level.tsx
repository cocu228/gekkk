export enum RiskLevel {
    SAFE = 'Safe',
    BALANCED = 'Balanced',
    DYNAMIC = 'Dynamic'
}

export default {
    [RiskLevel.SAFE]: <p>
        <b>Safe strategy</b> - full capital protection and guaranteed return;
        good for conservative investors and beginners as it excludes any risks associated with a fall of cryptocurrency rate.
    </p>,

    [RiskLevel.BALANCED]: <p>
        <b>Balanced strategy</b> - full or partial capital protection; increased potential for
        returns along with the minimal risk level.
    </p>,

    [RiskLevel.DYNAMIC]: <p>
        <b>Dynamic strategy</b> - partial capital protection; extremely high potential for
        returns along with the increased risk level.
    </p>
}
