using UnityEngine;
using System.Collections;

public class Clouds : MonoBehaviour
{
    public float speed = 5;

    void Start()
    {
        speed *= Random.Range(1f, 2f);
    }

    void Update()
    {
        transform.Rotate(0, speed * Time.deltaTime, 0, Space.World);
    }
}