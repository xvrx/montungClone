import React, { useContext } from 'react'
import { MontungContext } from '../../Context/MontungContext'

const TableAll = () => {

    const { usulanFiltered, tunggakanFiltered, selesaiFiltered,
        sum, shortenValue, plus, percentages } = useContext(MontungContext)







    //! TERBIT
    function overviewSKPTerbit(montungFiltered, kriteria, lokasi) {
        const filtered = montungFiltered?.filter(
            (montung) => {
                if (lokasi === false) return montung?.Kriteria === kriteria?.toString() && montung.LHP?.length > 1 && montung.Kode?.slice(0, 1) !== '6'
                if (lokasi === true) return montung?.Kode?.slice(0, 1) === '6' && montung.LHP?.length > 1
            }
        )
        if (filtered === null || filtered === NaN) return 0
        const summed = sum(filtered, 'NilaiSKPTerbit')
        if (summed) return [summed, shortenValue(summed)]
        return ['', '']
    }

    // ! LHP CAIR

    function overviewSKPCair(montungFiltered, kriteria, lokasi) {
        const filtered = montungFiltered?.filter(
            (montung) => {
                if (lokasi === false) return montung?.Kriteria === kriteria?.toString() && montung.LHP?.length > 1 && montung.Kode?.slice(0, 1) !== '6'
                if (lokasi === true) return montung?.Kode?.slice(0, 1) === '6' && montung.LHP?.length > 1
            }
        )
        const summed = sum(filtered, 'NilaiPencairan')
        if (summed) return [summed, shortenValue(summed)]
        return ['', '']
    }

    // ! PROYEKSI CAIR 
    function overviewProyeksiSKP(montungFiltered, kriteria, lokasi) {
        const filtered = montungFiltered?.filter(
            (montung) => {
                if (lokasi === false) return montung?.Kriteria === kriteria?.toString() && montung.NomorSP2?.length > 1 && montung.Kode?.slice(0, 1) !== '6'
                if (lokasi === true) return montung?.Kode?.slice(0, 1) === '6' && montung.NomorSP2?.length > 1
            }
        )
        const summed = sum(filtered, 'NilaiProyeksiPencairan' || 0)
        const SKPterbit = overviewSKPTerbit(selesaiFiltered, kriteria, lokasi)

        const total = plus(SKPterbit[0], summed)
        if (summed && SKPterbit) return [total, shortenValue(total)]
        if (summed) return [plus(SKPterbit[0], summed), shortenValue(plus(SKPterbit[0], summed))]
        return [plus(SKPterbit[0], summed), shortenValue(plus(SKPterbit[0], summed))]
        // return ['',SKPterbit[0]+summed]
    }


    // !USULAN
    function usulanOverview(montungFiltered, namaKriteria) {
        const filtered = montungFiltered?.filter(
            (montung) => {
                return montung.Kriteria === namaKriteria.toString() && montung.AuditPlan?.length < 1 && montung.Kode?.slice(0, 1) !== '6'
            }
        )
        return filtered
    }

    function usulanLokasiOverview(montungFiltered) {
        const filtered = montungFiltered?.filter(
            (montung) => {
                return montung.Kode?.slice(0, 1) === '6' && montung.AuditPlan?.length < 1
            }
        )

        return filtered
    }

    // !Audit Plan
    function auditplanOverview(montungFiltered, namaKriteria) {
        const filtered = montungFiltered?.filter(
            (montung) => {
                return montung.Kriteria === namaKriteria.toString() && montung.AuditPlan?.length > 1 && montung.Kode?.slice(0, 1) !== '6'
            }
        )
        return filtered
    }

    function auditplanLokasiOverview(montungFiltered) {
        const filtered = montungFiltered?.filter(
            (montung) => {
                return montung.Kode?.slice(0, 1) === '6' && montung.AuditPlan?.length > 1
            }
        )

        return filtered
    }

    //! SP2

    function SP2Overview(montungFiltered, namaKriteria) {
        const filtered = montungFiltered?.filter(
            (montung) => {
                return montung?.Kriteria === namaKriteria?.toString() && montung.NomorSP2?.length > 1 && montung.Kode?.slice(0, 1) !== '6'
            }
        )
        return filtered
    }

    function SP2LokasiOverview(montungFiltered) {
        const filtered = montungFiltered?.filter(
            (montung) => {
                return montung.Kode?.slice(0, 1) === '6' && montung.NomorSP2?.length > 1
            }
        )

        return filtered
    }
    //! LHP

    function LHPOverview(montungFiltered, namaKriteria) {
        const filtered = montungFiltered?.filter(
            (montung) => {
                return montung?.Kriteria === namaKriteria?.toString() && montung.LHP?.length > 1 && montung.Kode?.slice(0, 1) !== '6'
            }
        )
        return filtered
    }

    function LHPLokasiOverview(montungFiltered) {
        const filtered = montungFiltered?.filter(
            (montung) => {
                return montung.Kode?.slice(0, 1) === '6' && montung.LHP?.length > 1
            }
        )

        return filtered
    }




    return (
        <div className="overview-table-lists">
            <div className='overview-table-header'></div>
            <div className='overview-table-header'>Pemsus</div>
            <div className='overview-table-header'>Rutin</div>
            <div className='overview-table-header'>Rutin LB (SKPKB/STP)</div>
            <div className='overview-table-header'>WP Lokasi</div>
            <div className='overview-table-header'>Tujuan Lain</div>
            <div className='overview-table-header'>Total</div>
            <div className='overview-table-box-row' >Usulan</div>
            <div className='overview-table-box' id='usulan-pemsus'>{usulanOverview(usulanFiltered, 'Pemsus')?.length}</div>
            <div className='overview-table-box' id='usulan-rutin'>{usulanOverview(usulanFiltered, 'Rutin')?.length}</div>
            <div className='overview-table-box' id='usulan-rutin-lb'>{usulanOverview(usulanFiltered, 'Rutin LB')?.length}</div>
            <div className='overview-table-box' id='usulan-wp-lokasi'>{usulanLokasiOverview(usulanFiltered)?.length}</div>
            <div className='overview-table-box' id='usulan-tujuan-lain'>{usulanOverview(usulanFiltered, 'Tujuan Lain')?.length}</div>
            <div className='overview-table-box' id='usulan-total'>
                {
                    plus(
                        usulanOverview(usulanFiltered, 'Pemsus')?.length || 0,
                        usulanOverview(usulanFiltered, 'Rutin')?.length || 0,
                        usulanOverview(usulanFiltered, 'Rutin LB')?.length || 0,
                        usulanLokasiOverview(usulanFiltered)?.length || 0,
                        usulanOverview(usulanFiltered, 'Tujuan Lain')?.length || 0
                    )
                }</div>
            <div className='overview-table-box-row' >Audit plan</div>
            <div className='overview-table-box' id='auditplan-pemsus'>{auditplanOverview(usulanFiltered, 'Pemsus')?.length}</div>
            <div className='overview-table-box' id='auditplan-rutin'>{auditplanOverview(usulanFiltered, 'Rutin')?.length}</div>
            <div className='overview-table-box' id='auditplan-rutin-lb'>{auditplanOverview(usulanFiltered, 'Rutin LB')?.length}</div>
            <div className='overview-table-box' id='auditplan-wp-lokasi'>{auditplanLokasiOverview(usulanFiltered)?.length}</div>
            <div className='overview-table-box' id='auditplan-tujuan-lain'>{auditplanOverview(usulanFiltered, 'Tujuan Lain')?.length}</div>
            <div className='overview-table-box' id='auditplan-total'>
                {
                    plus(
                        auditplanOverview(usulanFiltered, 'Pemsus')?.length || 0,
                        auditplanOverview(usulanFiltered, 'Rutin')?.length || 0,
                        auditplanOverview(usulanFiltered, 'Rutin LB')?.length || 0,
                        auditplanLokasiOverview(usulanFiltered)?.length || 0,
                        auditplanOverview(usulanFiltered, 'Tujuan Lain')?.length || 0
                    )
                }
            </div>
            <div className='overview-table-box-row' >SP2</div>
            <div className='overview-table-box' id='sp2-pemsus'>{SP2Overview(tunggakanFiltered, 'Pemsus')?.length}</div>
            <div className='overview-table-box' id='sp2-rutin'>{SP2Overview(tunggakanFiltered, 'Rutin')?.length}</div>
            <div className='overview-table-box' id='sp2-rutin-lb'>{SP2Overview(tunggakanFiltered, 'Rutin LB')?.length}</div>
            <div className='overview-table-box' id='sp2-wp-lokasi'>{SP2LokasiOverview(tunggakanFiltered)?.length}</div>
            <div className='overview-table-box' id='sp2-tujuan-lain'>{SP2Overview(tunggakanFiltered, 'Tujuan Lain')?.length}</div>
            <div className='overview-table-box' id='sp2-total'>
                {
                    plus(
                        SP2Overview(tunggakanFiltered, 'Pemsus')?.length || 0,
                        SP2Overview(tunggakanFiltered, 'Rutin')?.length || 0,
                        SP2Overview(tunggakanFiltered, 'Rutin LB')?.length || 0,
                        SP2LokasiOverview(tunggakanFiltered)?.length || 0,
                        SP2Overview(tunggakanFiltered, 'Tujuan Lain')?.length || 0
                    )
                }
            </div>
            <div className='overview-table-box-row' >LHP</div>
            <div className='overview-table-box' id='lhp-pemsus'>{LHPOverview(selesaiFiltered, 'Pemsus')?.length}</div>
            <div className='overview-table-box' id='lhp-rutin'>{LHPOverview(selesaiFiltered, 'Rutin')?.length}</div>
            <div className='overview-table-box' id='lhp-rutin-lb'>{LHPOverview(selesaiFiltered, 'Rutin LB')?.length}</div>
            <div className='overview-table-box' id='lhp-wp-lokasi'>{LHPLokasiOverview(selesaiFiltered)?.length}</div>
            <div className='overview-table-box' id='lhp-tujuan-lain'>{LHPOverview(selesaiFiltered, 'Tujuan Lain')?.length}</div>
            <div className='overview-table-box' id='lhp-total'>
                {
                    plus(
                        LHPOverview(selesaiFiltered, 'Pemsus')?.length || 0,
                        LHPOverview(selesaiFiltered, 'Rutin')?.length || 0,
                        LHPOverview(selesaiFiltered, 'Rutin LB')?.length || 0,
                        LHPLokasiOverview(selesaiFiltered)?.length || 0,
                        LHPOverview(selesaiFiltered, 'Tujuan Lain')?.length || 0
                    )
                }
            </div>
            <div className='overview-table-box-row' >SKP Terbit</div>
            <div className='overview-table-box' id='skp-pemsus'>{overviewSKPTerbit(selesaiFiltered, 'Pemsus', false)[1] || 0}</div>
            <div className='overview-table-box' id='skp-rutin'>{overviewSKPTerbit(selesaiFiltered, 'Rutin', false)[1] || 0}</div>
            <div className='overview-table-box' id='skp-rutin-lb'>{overviewSKPTerbit(selesaiFiltered, 'Rutin LB', false)[1] || 0}</div>
            <div className='overview-table-box' id='skp-wp-lokasi'>{overviewSKPTerbit(selesaiFiltered, 'Rutin', true)[1] || 0}</div>
            <div className='overview-table-box' id='skp-tujuan-lain'>{overviewSKPTerbit(selesaiFiltered, 'Tujuan Lain', false)[1] || 0}</div>
            <div className='overview-table-box' id='skp-total'>
                {shortenValue(sum(selesaiFiltered, 'NilaiSKPTerbit'))}
            </div>
            <div className='overview-table-box-row' >Pencairan</div>
            <div className='overview-table-box' id='pencairan-pemsus'>{(overviewSKPCair(selesaiFiltered, 'Pemsus', false)[1]) || 0}</div>
            <div className='overview-table-box' id='pencairan-rutin'>{(overviewSKPCair(selesaiFiltered, 'Rutin', false)[1]) || 0}</div>
            <div className='overview-table-box' id='pencairan-rutin-lb'>{(overviewSKPCair(selesaiFiltered, 'Rutin LB', false)[1]) || 0}</div>
            <div className='overview-table-box' id='pencairan-wp-lokasi'>{(overviewSKPCair(selesaiFiltered, '', true)[1]) || 0}</div>
            <div className='overview-table-box' id='pencairan-tujuan-lain'>{(overviewSKPCair(selesaiFiltered, 'Tujuan Lain', false)[1]) || 0}</div>
            <div className='overview-table-box' id='pencairan-total'>
                {
                    shortenValue(sum(selesaiFiltered, 'NilaiPencairan'))
                }
            </div>
            <div className='overview-table-box-row' >Proyeksi</div>
            <div className='overview-table-box' id='proyeksi-pemsus'>{overviewProyeksiSKP(tunggakanFiltered, 'Pemsus', false)[1] || 0}</div>
            <div className='overview-table-box' id='proyeksi-rutin'>{overviewProyeksiSKP(tunggakanFiltered, 'Rutin', false)[1] || 0}</div>
            <div className='overview-table-box' id='proyeksi-rutin-lb'>{overviewProyeksiSKP(tunggakanFiltered, 'Rutin LB', false)[1] || 0}</div>
            <div className='overview-table-box' id='proyeksi-wp-lokasi'>{overviewProyeksiSKP(tunggakanFiltered, '', true)[1] || 0}</div>
            <div className='overview-table-box' id='proyeksi-tujuan-lain'>{overviewProyeksiSKP(tunggakanFiltered, 'Tujuan Lain', false)[1] || 0}</div>
            <div className='overview-table-box' id='proyeksi-total'>
                {
                    shortenValue(sum(tunggakanFiltered, 'NilaiProyeksiPencairan') + sum(selesaiFiltered, 'NilaiSKPTerbit'))
                }
            </div>
            <div className='overview-table-box-row' >Pencairan/Proyeksi</div>
            <div className='overview-table-box' id='capaian-pemsus'>
                {percentages(overviewSKPCair(selesaiFiltered, 'Pemsus', false)[0], overviewProyeksiSKP(tunggakanFiltered, 'Pemsus', false)[0])}
            </div>
            <div className='overview-table-box' id='capaian-rutin'>
                {percentages(overviewSKPCair(selesaiFiltered, 'Rutin', false)[0], overviewProyeksiSKP(tunggakanFiltered, 'Rutin', false)[0])}
            </div>
            <div className='overview-table-box' id='capaian-rutin-lb'>
                {percentages(overviewSKPCair(selesaiFiltered, 'Rutin LB', false)[0], overviewProyeksiSKP(tunggakanFiltered, 'Rutin LB', false)[0])}
            </div>
            <div className='overview-table-box' id='capaian-wp-lokasi'>
                {percentages(overviewSKPCair(selesaiFiltered, 'Rutin B', true)[0], overviewProyeksiSKP(tunggakanFiltered, '', true)[0])}
            </div>
            <div className='overview-table-box' id='capaian-tujuan-lain'>
                {percentages(overviewSKPCair(selesaiFiltered, 'Tujuan Lain', false)[0], overviewProyeksiSKP(tunggakanFiltered, 'Tujuan Lain', false)[0])}
            </div>
            <div className='overview-table-box' id='capaian-total'>
                {
                    percentages(sum(selesaiFiltered, 'NilaiPencairan'), sum(tunggakanFiltered, 'NilaiProyeksiPencairan') + sum(selesaiFiltered, 'NilaiSKPTerbit'))
                }
            </div>

        </div>
    )
}

export default TableAll