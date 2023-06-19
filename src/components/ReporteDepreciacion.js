import React from 'react'
import { Document, Page, Text, View } from "@react-pdf/renderer";

const ReporteDepreciacion = ({ activos, tipo }) => {

  var element = ""
  for (let index = 0; index < activos.length; index++) {
    element = activos[index].fecha_depre;
  }

  const styles = ({
    table: { 
      display: "table",
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0
    }, 
    tableRow: { 
      margin: "auto", 
      flexDirection: "row" 
    }, 
    tableCol: { 
      
    },
    tableCol2: {
      width: "15%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      padding: 1
    },
    tableCell: { 
      margin: "auto", 
      fontSize: 10,
      padding: 1 
    }
  });
  return (
    <Document>
       <Page
          size="A4"
          style={{
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              paddingTop: 40,
              paddingBottom: 30
            }}
          >
            <Text style={{ color: "#000000", fontSize: "42px" }}>
              Reporte de Depreciacion
            </Text>
            <Text>Depreciacion a activos de tipo "{tipo.tipo}" </Text>
            <Text>Porcentaje de depreciacion: {tipo.depreciacion} % </Text>
            <Text>Años de Vida: {tipo.anosdevida} años </Text>
          </View>

          <View style={{ 
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "left",
              paddingLeft: 20
              }}>
              <Text style={{fontSize: "16"}}>Calculo de depreciacion a la fecha {element}</Text>
          </View>
          <View style={{ 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
              }}>
            <View style={styles.table}> 
              <View style={styles.tableRow}> 
                <View style={{
                  width: "4%", 
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1}}> 
                  <Text style={styles.tableCell}>Id</Text> 
                </View> 
                <View style={{
                  width: "15%",
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Activo</Text> 
                </View> 
                <View style={{
                  width: "10%",
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}>
                  <Text style={styles.tableCell}>Fecha de Compra</Text> 
                </View>
                <View style={{
                  width: "10%",
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Valor de Compra</Text> 
                </View> 
                <View style={{
                  width: "10%",
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Valor Neto</Text> 
                </View>  
                <View style={{
                  width: "14%",
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Depreciacion Mensual</Text> 
                </View> 
                <View style={{
                  width: "14%",
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Depreciacion Acumulada</Text> 
                </View> 
                <View style={{
                  width: "15%",
                  borderStyle: "solid", 
                  borderWidth: 1, 
                  borderLeftWidth: 0, 
                  borderTopWidth: 0,
                  padding: 1
                }}> 
                  <Text style={styles.tableCell}>Valor Residual</Text> 
                </View> 
              </View>
              {activos.map((usuario) => (
                <View style={styles.tableRow} key={usuario.id_activo}> 
                  <View style={{
                    width: "4%", 
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1}}> 
                    <Text style={styles.tableCell}>{usuario.id_activo}</Text> 
                  </View> 
                  <View style={{
                    width: "15%",
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell}>{usuario.nombre_activo}</Text> 
                  </View> 
                  <View style={{
                    width: "10%",
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}>
                    <Text style={styles.tableCell}>{usuario.fecha_compra}</Text> 
                  </View>
                  <View style={{
                    width: "10%",
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell}>{usuario.valor_compra}</Text> 
                  </View> 
                  <View style={{
                    width: "10%",
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell}>{usuario.valor_neto}</Text> 
                  </View>  
                  <View style={{
                    width: "14%",
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell}>{usuario.depre_mes}</Text> 
                  </View> 
                  <View style={{
                    width: "14%",
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell}>{usuario.depre_acumulada}</Text> 
                  </View> 
                  <View style={{
                    width: "15%",
                    borderStyle: "solid", 
                    borderWidth: 1, 
                    borderLeftWidth: 0, 
                    borderTopWidth: 0,
                    padding: 1
                  }}> 
                    <Text style={styles.tableCell}>{usuario.valor_residual}</Text> 
                  </View> 
                </View>
              ))} 
            </View>
          </View>
      </Page>
    </Document>
  );
};

export default ReporteDepreciacion;